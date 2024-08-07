import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`\${cc ? \`export interface \${componentName}States {}\n\` : ''}
export interface \${componentName}Props {
  className?: string;
  prefixCls?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
}
\``;

export const tpl_new_interface = {
  tpl
};

export default tplEngineNew(tpl_new_interface, 'tpl');