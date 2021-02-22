import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`declare module '*.css' {
  const resource: { [key: string]: string };
  export = resource;
}

declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}

declare module '*.scss' {
  const resource: { [key: string]: string };
  export = resource;
}

declare module '*.sass' {
  const resource: { [key: string]: string };
  export = resource;
}

declare module '*.svg';

declare module '*.png';

declare module '*.jpg';

declare module '*.jpeg';

declare module '*.gif';

declare module '*.md' {
  const content: string;
  export default content;
}
\``;

export const tpl_src_declaration_global = {
  tpl
};

export default tplEngineInit(tpl_src_declaration_global, 'tpl');