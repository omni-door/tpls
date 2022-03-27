import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`.\${pageName} {
  display: block;
}
\``;

export const tpl_src_page_style = {
  tpl
};

export default tplEngineInit(tpl_src_page_style, 'tpl');