import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`PORT=6200\``;

export const tpl_env = {
  tpl
};

export default tplEngineInit(tpl_env, 'tpl');