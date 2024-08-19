import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`module.exports = {
  require: \${ts ? \`[
    'tsx',
    'tsconfig-paths/register'
  ]\` : '[]' },
  reporter: 'spec',
  spec: 'src/**/__test__/*.\${ts ? 'ts' : 'js'}'
};
\``;

export const tpl_mocha = {
  tpl
};

export default tplEngineInit(tpl_mocha, 'tpl');