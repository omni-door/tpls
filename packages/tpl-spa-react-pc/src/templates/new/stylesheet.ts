import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`.\${componentName} {
  display: block;
}
\``;

export const tpl_new_stylesheet = {
  tpl
};

export default tplEngineNew(tpl_new_stylesheet, 'tpl');