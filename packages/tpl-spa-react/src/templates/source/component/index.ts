import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`import \${componentName} from './\${componentName}';

export { \${componentName} } from './\${componentName}';
export default \${componentName};
\``;

export const tpl_src_component_index = {
  tpl
};

export default tpl_engine_init(tpl_src_component_index, 'tpl');