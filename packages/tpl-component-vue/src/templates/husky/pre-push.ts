import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\
\${
(eslint || prettier) && test
  ? 'npm run lint && npm run test'
  : (eslint || prettier)
      ? 'npm run lint'
      : test
        ? 'npm run test'
        : ''
}
\``;

export const tpl_husky_pre_push = {
  tpl
};

export default tplEngineInit(tpl_husky_pre_push, 'tpl');