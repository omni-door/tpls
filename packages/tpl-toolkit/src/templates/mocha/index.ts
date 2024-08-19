import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`module.exports = {
  color: true,
  diff: true,
  require: \${ts ? \`[
    'mocha.tsx.js',
    'tsconfig-paths/register'
  ]\` : '[]' },
  extension: ['ts', 'js'],
  reporter: 'spec',
  spec: ['src/**/__test__/*.\${ts ? 'ts' : 'js'}'],
  slow: '75',
  timeout: '60000',
  ui: 'bdd'
};
\``;

export const tpl_mocha = {
  tpl
};

export default tplEngineInit(tpl_mocha, 'tpl');