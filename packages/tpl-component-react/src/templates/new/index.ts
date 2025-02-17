import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import \${componentName} from './\${componentName}';

export { \${componentName} } from './\${componentName}';

export default \${componentName};

\${ts ? \`export * from './interface';\` : ''}
\``;

export const tpl_new_index = {
  tpl
};

export default tplEngineNew(tpl_new_index, 'tpl');