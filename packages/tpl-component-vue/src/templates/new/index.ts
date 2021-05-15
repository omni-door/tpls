import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import \${componentName} from './\${componentName}.vue';

export default \${componentName};
\``;

export const tpl_new_index = {
  tpl
};

export default tplEngineNew(tpl_new_index, 'tpl');