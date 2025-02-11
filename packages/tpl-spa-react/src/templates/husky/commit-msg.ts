import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\
lint-staged
\``;

export const tpl_husky_commit_msg = {
  tpl
};

export default tplEngineInit(tpl_husky_commit_msg, 'tpl');