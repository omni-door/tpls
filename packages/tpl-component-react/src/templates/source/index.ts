import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`export {};
export default {};
\``;

export const tpl_src_index = {
  tpl
};

export default tpl_engine_init(tpl_src_index, 'tpl');