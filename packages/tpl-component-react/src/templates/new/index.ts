import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`import \${componentName} from './\${componentName}';

export { \${componentName} } from './\${componentName}';

export default \${componentName};

export * from './interface';
\``;

export const tpl_new_index = {
  tpl
};

export default tpl_engine_new(tpl_new_index, 'tpl');