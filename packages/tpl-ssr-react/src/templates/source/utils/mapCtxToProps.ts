import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import paramsToQueryString from './paramsToQueryString';
\${ts ? \`
export type MapCtxToProps = {
  page: string;
  query: string;
  path: string;
};
\` : '' }
export function mapCtxToProps(ctx\${ts ? ': any' : ''}) {
  const { pathname, query, asPath } = ctx;
  return {
    page: (pathname.replace(/\\\\//g, '') || 'home')\${ts ? ' as string' : ''},
    query: query\${ts ? ' as string' : ''},
    path:
      (asPath ||
        \\\`\\\${pathname}\\\${paramsToQueryString(query)}\\\`)\${ts ? ' as string' : ''}
  };
}

export default mapCtxToProps;
\``;

export const tpl_src_utils_mapctx = {
  tpl
};

export default tplEngineInit(tpl_src_utils_mapctx, 'tpl');