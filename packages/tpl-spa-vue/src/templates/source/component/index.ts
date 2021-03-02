import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import \${componentName} from './\${componentName}';

export default \${componentName};
\``;

export const tpl_src_component_index = {
  tpl
};

export default tplEngineInit(tpl_src_component_index, 'tpl');