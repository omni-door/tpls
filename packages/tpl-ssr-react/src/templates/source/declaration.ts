import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`declare module 'next-url-prettifier';
\``;

export const tpl_src_declaration = {
  tpl
};

export default tplEngineInit(tpl_src_declaration, 'tpl');