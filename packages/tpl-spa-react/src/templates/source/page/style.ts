import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`.\${pageName} {
  display: block;
  font-size: 45px;
}
\``;

export const tpl_src_page_style = {
  tpl
};

export default tpl_engine_init(tpl_src_page_style, 'tpl');