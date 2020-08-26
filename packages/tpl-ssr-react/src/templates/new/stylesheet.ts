import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`.\${componentName} {
  display: block;
}
\``;

export const tpl_new_stylesheet = {
  tpl
};

export default tpl_engine_new(tpl_new_stylesheet, 'tpl');