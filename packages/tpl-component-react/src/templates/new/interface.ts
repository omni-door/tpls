import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import type { MouseEventHandler } from 'react';
\${cc ? \`export interface \${componentName}States {}\n\` : ''}

export interface \${componentName}Props {
  className?: string;
  prefixCls?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
\``;

export const tpl_new_interface = {
  tpl
};

export default tplEngineNew(tpl_new_interface, 'tpl');