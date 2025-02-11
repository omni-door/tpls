import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\
npm run lint:commit
\``;

export const tpl_husky_pre_commit = {
  tpl
};

export default tplEngineInit(tpl_husky_pre_commit, 'tpl');