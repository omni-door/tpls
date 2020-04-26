import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`**/__test__/
\``;

export const tpl_ignore_prettier = {
  tpl 
};

export default tpl_engine_init(tpl_ignore_prettier, 'tpl');

