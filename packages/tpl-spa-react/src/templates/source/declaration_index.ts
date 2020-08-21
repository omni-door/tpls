import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`import type { IRoute } from '@/routes';

export interface PageProps {
  routes?: IRoute[];
}
\``;

export const tpl_src_declaration_index = {
  tpl
};

export default tpl_engine_init(tpl_src_declaration_index, 'tpl');