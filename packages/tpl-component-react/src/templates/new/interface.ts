import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`\${ts ? \`import type { MouseEvent } from 'react';\` : ''}
\${cc ? \`export interface \${componentName}States {}\n\` : ''}

export interface \${componentName}Props {
  className?: string;
  prefixCls?: string;
  onClick?: (\${ts ? \`e: MouseEvent<HTMLDivElement, MouseEvent>\` : 'e'}) => any;
}
\``;

export const tpl_new_interface = {
  tpl
};

export default tplEngineNew(tpl_new_interface, 'tpl');