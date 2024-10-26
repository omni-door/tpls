import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`'use server';
\${ts ? \`/* import types */
import type { GetServerSidePropsContext } from 'next';

export interface MapCtxToProps {
  props: { page: string; } & Pick<GetServerSidePropsContext, 'params' | 'query'>;
}
\` : '' }
export function mapCtxToProps(ctx\${ts ? ': GetServerSidePropsContext' : ''}) {
  'use server';
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