import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`declare module '*.css';

declare module '*.less';

declare module '*.scss';

declare module '*.sass';

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

export const tpl_src_declaration = {
  tpl
};

export default tplEngineInit(tpl_src_declaration, 'tpl');