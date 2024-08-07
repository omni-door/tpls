import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import \${componentName} from './\${type === 'sfc' ? componentName + '.vue' : componentName}';
\${ts ? \`import type { App, defineComponent } from 'vue';

export type \${componentName} = ReturnType<typeof defineComponent> & {
  install(app: App): void
}
\` : ''}
\${ts ? \`(\${componentName} as \${componentName}).install\` : \`\${componentName}.install\`} = (\${ts ? \`app: App\` : 'app'}): void => {
  app.component(\${componentName}.\${ts ? 'name!' : 'name'}, \${componentName});
};

export default \${componentName};
\``;

export const tpl_new_index = {
  tpl
};

export default tplEngineNew(tpl_new_index, 'tpl');