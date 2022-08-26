import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import paramsToQueryString from './paramsToQueryString';
\${ts ? \`/* import types */
import type { NextPageContext } from 'next';

export type MapCtxToProps = {
  page: string;
  query: NodeJS.Dict<string | string[]>;
  path: string;
};
\` : '' }
export function mapCtxToProps(ctx\${ts ? ': NextPageContext' : ''}) {
  const { pathname, query, asPath } = ctx;
  return {
    page: pathname.replace(/\//g, '') || 'home',
    query,
    path: asPath || \\\`\\\${pathname}\\\${paramsToQueryString(query)}\\\`
  };
}

export default mapCtxToProps;
\``;

export const tpl_src_utils_mapctx = {
  tpl
};

export default tplEngineInit(tpl_src_utils_mapctx, 'tpl');