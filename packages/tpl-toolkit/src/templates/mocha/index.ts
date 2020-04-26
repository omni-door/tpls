import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`# mocha.opts
--require ts-node/register src/**/__test__/*.\${ts ? 'ts' : 'js'}
--reporter spec
\``;

export const tpl_mocha = {
  tpl
};

export default tpl_engine_init(tpl_mocha, 'tpl');