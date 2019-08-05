import * as path from 'path';
import * as fse from 'fs-extra';
import * as ttp from 'typescript-to-proptypes';
import * as prettier from 'prettier';
import * as glob from 'glob';
import * as _ from 'lodash';
import { fixBabelGeneratorIssues, fixLineEndings } from '../../../docs/scripts/helpers';

const ignoreCache = process.argv.includes('--disable-cache');
const verbose = process.argv.includes('--verbose');

enum GenerateResult {
  Success,
  Skipped,
  NoComponent,
  Failed,
}

const tsconfig = ttp.loadConfig(path.resolve(__dirname, '../tsconfig.json'));

const prettierConfig = prettier.resolveConfig.sync(process.cwd(), {
  config: path.join(__dirname, '../../../prettier.config.js'),
});

async function generateProptypes(
  tsFile: string,
  jsFile: string,
  program: ttp.ts.Program,
): Promise<GenerateResult> {
  const proptypes = ttp.parseFromProgram(tsFile, program, {
    shouldResolveObject: ({ name }) => {
      if (name === 'classes' || name === 'theme' || name.endsWith('Props')) {
        return false;
      }
      return undefined;
    },
  });

  if (proptypes.body.length === 0) {
    return GenerateResult.NoComponent;
  }

  proptypes.body.forEach(component => {
    component.types.forEach(prop => {
      if (prop.name === 'classes' && prop.jsDoc) {
        prop.jsDoc += '\nSee [CSS API](#css) below for more details.';
      } else if (prop.name === 'className') {
        prop.jsDoc = '@ignore';
      } else if (prop.name === 'children' && !prop.jsDoc) {
        prop.jsDoc = 'The content of the component.';
      }
    });
  });

  const jsContent = await fse.readFile(jsFile, 'utf8');

  const result = ttp.inject(proptypes, jsContent, {
    removeExistingPropTypes: true,
    shouldInclude: ({ prop }) => {
      if (prop.name === 'children') {
        return true;
      }
      return undefined;
    },
  });

  if (!result) {
    return GenerateResult.Failed;
  }

  const prettified = prettier.format(result, { ...prettierConfig, filepath: jsFile });
  const formatted = fixBabelGeneratorIssues(prettified);
  const correctedLineEndings = fixLineEndings(jsContent, formatted);

  await fse.writeFile(jsFile, correctedLineEndings);
  return GenerateResult.Success;
}

async function run() {
  // Matches files where the folder and file both start with uppercase letters
  // Example: AppBar/AppBar.d.ts
  const files = glob
    .sync('+([A-Z])*/+([A-Z])*.d.ts', {
      absolute: true,
      cwd: path.resolve(__dirname, '../src'),
    })
    // Filter out files where the directory name and filename doesn't match
    // Example: Modal/ModalManager.d.ts
    .filter(filePath => {
      const folderName = path.basename(path.dirname(filePath));
      const fileName = path.basename(filePath, '.d.ts');

      return fileName === folderName;
    });

  const program = ttp.createProgram(files, tsconfig);

  const promises = files.map<Promise<GenerateResult>>(async tsFile => {
    const jsFile = tsFile.replace('.d.ts', '.js');

    if (!ignoreCache && (await fse.stat(jsFile)).mtimeMs > (await fse.stat(tsFile)).mtimeMs) {
      // Javascript version is newer, skip file
      return GenerateResult.Skipped;
    }

    return generateProptypes(tsFile, jsFile, program);
  });

  const results = await Promise.all(promises);

  if (verbose) {
    files.forEach((file, index) => {
      console.log('%s - %s', GenerateResult[results[index]], path.basename(file, '.d.ts'));
    });
  }

  console.log('--- Summary ---');
  const groups = _.groupBy(results, x => x);

  _.forOwn(groups, (count, key) => {
    console.log('%s: %d', GenerateResult[(key as unknown) as GenerateResult], count.length);
  });

  console.log('Total: %d', results.length);
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
