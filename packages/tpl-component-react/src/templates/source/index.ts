import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`export {};
export default {};
\``;

export const tpl_src_index = {
  tpl
};

export default tplEngineInit(tpl_src_index, 'tpl');