import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${ts ? \`/* import types */
import type { GetServerSidePropsContext } from 'next';

export interface MapCtxToProps extends Pick<GetServerSidePropsContext, 'params' | 'query'> {
  page: string;
}
\` : '' }
export function mapCtxToProps(ctx\${ts ? ': GetServerSidePropsContext' : ''}) {
  const { params = null, query, resolvedUrl } = ctx;
  return {
    props: {
      params,
      query,
      page: resolvedUrl
    }
  };
}

export default mapCtxToProps;
\``;

export const tpl_src_utils_mapctx = {
  tpl
};

export default tplEngineInit(tpl_src_utils_mapctx, 'tpl');