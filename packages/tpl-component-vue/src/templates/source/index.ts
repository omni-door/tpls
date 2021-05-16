import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${ts ? \`import type { VueConstructor } from 'vue';\` : ''}

install.installed = false;
function install (Vue\${ts ? \`: VueConstructor<Vue>\` : ''}) {
  if (install.installed) return;
  install.installed = true;
}

let GlobalVue;
const win = window ?? global;
if (typeof win !== 'undefined') {
  GlobalVue = win.Vue;
}

if (GlobalVue) install(GlobalVue);

export default {
  install
};
\``;

export const tpl_src_index = {
  tpl
};

export default tplEngineInit(tpl_src_index, 'tpl');