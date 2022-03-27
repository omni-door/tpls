import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`.\${componentName} {
  display: block;
}
\``;

export const tpl_src_component_style = {
  tpl
};

export default tplEngineInit(tpl_src_component_style, 'tpl');