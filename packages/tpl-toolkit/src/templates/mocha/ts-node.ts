import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`require('ts-node').register({
  compilerOptions: {
    module: 'commonjs'
  }
});
\``;

export const tpl_tsnode = {
  tpl
};

export default tplEngineInit(tpl_tsnode, 'tpl');