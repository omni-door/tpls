import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`import './\${componentName}.\${style === 'all' ? 'scss' : style}';\``;

export const tpl_new_style = {
  tpl
};

export default tpl_engine_new(tpl_new_style, 'tpl');