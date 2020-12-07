import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`# mocha.opts
\${ts ? \`--require ts-node/register
--require tsconfig-paths/register
--reporter spec\` : '--reporter spec'}
src/**/__test__/*.\${ts ? 'ts' : 'js'}
\``;

export const tpl_mocha = {
  tpl
};

export default tpl_engine_init(tpl_mocha, 'tpl');