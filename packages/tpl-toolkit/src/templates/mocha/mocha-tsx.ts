import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`require('tsx/cjs/api').register({
  compilerOptions: {
    module: 'commonjs'
  }
});
\``;

export const tpl_mocha_tsx = {
  tpl
};

export default tplEngineInit(tpl_mocha_tsx, 'tpl');