import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`\${ts ? \`import type { MouseEventHandler } from 'react';\` : ''}
\${cc ? \`export interface \${componentName}States {}\n\` : ''}

export interface \${componentName}Props {
  className?: string;
  prefixCls?: string;
  onClick?: (\${ts ? \`e: MouseEventHandler<HTMLDivElement>\` : 'e'}) => any;
}
\``;

export const tpl_new_interface = {
  tpl
};

export default tplEngineNew(tpl_new_interface, 'tpl');