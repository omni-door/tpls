import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import \${componentName} from './\${componentName}';
\${ts ? \`import type { VueConstructor } from 'vue';
\` : ''}
\${componentName}.install = (\${ts ? \`app: VueConstructor<Vue>\` : 'app'}): void => {
  app.component(\${componentName}.name, \${componentName})
}

export default \${componentName};
\``;

export const tpl_new_index = {
  tpl
};

export default tplEngineNew(tpl_new_index, 'tpl');