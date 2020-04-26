import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`PORT=6200\``;

export const tpl_env = {
  tpl
};

export default tpl_engine_init(tpl_env, 'tpl');