import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`export default {
  title: '\${project_name.toLowerCase()}',
  mode: 'doc',
  publicPath: './',
  history: { type: 'hash' }
};
\``;

export const tpl_umirc = {
  tpl
};

export default tpl_engine_init(tpl_umirc, 'tpl');