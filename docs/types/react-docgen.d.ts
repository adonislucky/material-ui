declare module 'react-docgen' {
  import { ASTNode } from 'ast-types';
  // `import { NodePath } from 'ast-types';` points to `const NodePath: NodePathConstructor` for unknown reasons.
  import { NodePath as AstTypesNodePath } from 'ast-types/lib/node-path';

  export { ASTNode };

  // sound wrapper around `NodePath` from `ast-types` i.e. no `any`
  export type NodePath<Node extends ASTNode = ASTNode, Value = unknown> = AstTypesNodePath<
    Node,
    Value | undefined
  >;

  export interface Documentation {
    toObject(): ReactDocgenApi;
  }

  export type Handler = (
    documentation: Documentation,
    componentDefinition: NodePath,
    importer: Importer
  ) => void;

  export const defaultHandlers: Handler[];

  export type Importer = (path: NodePath, name: string) => NodePath | undefined;
  export type Resolver = (
    ast: ASTNode,
    parser: unknown,
    importer: Importer
  ) => NodePath | NodePath[] | undefined;

  export namespace resolver {
    export const findAllComponentDefinitions: Resolver;
    export const findExportedComponentDefinition: Resolver;
    export const findAllExportedComponentDefinitions: Resolver;
  }
  export interface ReactDocgenApi {
    description: string;
    props: Record<string, PropDescriptor>;
  }

  export interface BasePropTypeDescriptor {
    computed?: boolean;
    description?: string;
    raw: string;
    required?: boolean;
    type?: PropType;
  }

  interface ArrayOfPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'arrayOf';
    value: PropTypeDescriptor;
  }
  interface CustomPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'custom';
  }
  interface EnumPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'enum';
    value: StringPropTypeDescriptor[];
  }
  interface ArrayPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'array';
  }
  interface BoolPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'bool';
  }
  interface FuncPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'func';
  }
  interface NumberPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'number';
  }
  interface ObjectPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'object';
  }
  interface StringPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'string';
    value: string;
  }
  interface AnyPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'any';
  }
  interface ElementPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'element';
  }
  interface NodePropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'node';
  }
  interface SymbolPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'symbol';
  }
  interface ObjectOfPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'objectOf';
  }
  interface ShapePropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'shape';
    value: Record<string, PropTypeDescriptor>;
  }
  interface ExactPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'exact';
  }
  interface UnionPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'union';
    value: PropTypeDescriptor[];
  }
  interface ElementTypePropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'elementType';
  }
  // not listed in react-docgen
  interface InstanceOfPropTypeDescriptor extends BasePropTypeDescriptor {
    name: 'instanceOf';
    value: string;
  }

  export type PropTypeDescriptor =
    | ShapePropTypeDescriptor
    | ArrayOfPropTypeDescriptor
    | CustomPropTypeDescriptor
    | EnumPropTypeDescriptor
    | ArrayPropTypeDescriptor
    | BoolPropTypeDescriptor
    | FuncPropTypeDescriptor
    | NumberPropTypeDescriptor
    | ObjectPropTypeDescriptor
    | StringPropTypeDescriptor
    | AnyPropTypeDescriptor
    | ElementPropTypeDescriptor
    | NodePropTypeDescriptor
    | SymbolPropTypeDescriptor
    | ObjectOfPropTypeDescriptor
    | ExactPropTypeDescriptor
    | UnionPropTypeDescriptor
    | ElementTypePropTypeDescriptor
    | InstanceOfPropTypeDescriptor;

  export interface PropDescriptor {
    defaultValue?: { computed: boolean; value: string };
    // augmented by docs/src/modules/utils/defaultPropsHandler.js
    jsdocDefaultValue?: { computed?: boolean; value: string };
    description?: string;
    // augmented by docs/src/modules/utils/defaultPropsHandler.js
    /**
     * External props are props that are documented on the component but implemented somewhere else.
     * For example, TextField documents `margin` but `margin` is spread to `FormControl` which actually implements `margin`.
     */
    external?: boolean;
    required?: boolean;
    /**
     * react-docgen has this as nullable but it was never treated as such
     */
    type: PropTypeDescriptor;
  }

  export interface AllLiteralPropType {
    type: 'AllLiteral';
  }

  export interface TypeApplicationPropType {
    applications: string[];
    type: 'TypeApplication';
  }

  export interface StringLiteralTypePropType {
    type: 'StringLiteralType';
  }

  export interface UnionPropType {
    type: 'UnionType';
    elements: PropType[];
  }

  export type PropType =
    | AllLiteralPropType
    | StringLiteralType
    | TypeApplicationPropType
    | UnionPropType;

  export function parse(
    source: string,
    componentResolver: null | Resolver,
    handlers: null | Handler[],
    options: { filename: string }
  ): any;

  export namespace utils {
    export function getPropertyName(path: NodePath): string | undefined;
    export function isReactForwardRefCall(path: NodePath, importer: Importer): boolean;
    export function printValue(path: NodePath): string;
    export function resolveExportDeclaration(path: NodePath, importer: Importer): NodePath[];
    export function resolveToValue(path: NodePath, importer: Importer): NodePath;
  }
}
