import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`export function \${componentName}() {}

export default \${componentName};
\``;

export const tpl_new_index = {
  tpl
};

export default tpl_engine_new(tpl_new_index, 'tpl');