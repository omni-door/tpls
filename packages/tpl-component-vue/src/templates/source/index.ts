import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${ts ? \`import type { App } from 'vue';
\` : ''}

install.installed = false;
function install(app\${ts ? \`: App\` : ''}) {
  if (install.installed) return;
  install.installed = true;
  // app.component()
}

export default {
  install
};
\``;

export const tpl_src_index = {
  tpl
};

export default tplEngineInit(tpl_src_index, 'tpl');