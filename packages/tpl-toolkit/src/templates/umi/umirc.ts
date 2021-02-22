import { tplEngineInit } from '@omni-door/utils';

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

export default tplEngineInit(tpl_umirc, 'tpl');