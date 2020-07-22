import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`export default {
  mode: 'doc'
};
\``;

export const tpl_umirc = {
  tpl
};

export default tpl_engine_init(tpl_umirc, 'tpl');