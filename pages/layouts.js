import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/layouts/layouts.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/layouts/Layouts.js': {
          js: require('docs/src/pages/layouts/Layouts').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/layouts/Layouts'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
