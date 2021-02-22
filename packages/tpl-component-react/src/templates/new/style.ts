import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import './\${componentName}.\${style === 'all' ? 'scss' : style}';\``;

export const tpl_new_style = {
  tpl
};

export default tplEngineNew(tpl_new_style, 'tpl');