import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import \${componentName} from './\${type === 'sfc' ? componentName + '.vue' : componentName}';
\${ts ? \`import type { defineComponent } from '@vue/composition-api';
import type { VueConstructor } from 'vue';

export type \${componentName} = ReturnType<typeof defineComponent> & {
  install(app: VueConstructor<Vue>): void
}
\` : ''}
\${ts ? \`(\${componentName} as \${componentName}).install\` : \`\${componentName}.install\`} = (\${ts ? \`app: VueConstructor<Vue>\` : 'app'}): void => {
  app.component(\${componentName}.name, \${componentName});
};

export default \${componentName};
\``;

export const tpl_new_index = {
  tpl
};

export default tplEngineNew(tpl_new_index, 'tpl');