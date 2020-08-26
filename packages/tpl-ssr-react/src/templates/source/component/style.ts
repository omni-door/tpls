import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`.\${componentName} {
  display: block;
  color: yellowgreen;
  font-size: 30px;
}
\``;

export const tpl_src_component_style = {
  tpl
};

export default tpl_engine_init(tpl_src_component_style, 'tpl');