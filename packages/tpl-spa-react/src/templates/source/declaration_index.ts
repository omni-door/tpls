import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import type { IRoute } from '@/routes';

export interface PageProps {
  routes?: IRoute[];
}
\``;

export const tpl_src_declaration_index = {
  tpl
};

export default tplEngineInit(tpl_src_declaration_index, 'tpl');