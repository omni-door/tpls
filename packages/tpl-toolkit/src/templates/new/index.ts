import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`export function \${componentName}() {}

export default \${componentName};
\``;

export const tpl_new_index = {
  tpl
};

export default tplEngineNew(tpl_new_index, 'tpl');