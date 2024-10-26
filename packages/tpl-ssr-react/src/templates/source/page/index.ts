import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import * as React from 'react';
import Layout from '@components/Layout';
import \${pageName} from '@components/\${pageName}';
import mapCtxToProps from '@utils/mapCtxToProps';
\${ts ? \`/* import types */
import type { NextPage, GetServerSidePropsContext } from 'next';
import type { MapCtxToProps } from '@utils/mapCtxToProps';

interface \${pageName}PageProps extends MapCtxToProps {}
\` : ''}
const \${pageName}Page\${ts ? \`: NextPage<\${pageName}PageProps>\` : ''}= props => {
  return (
    <Layout
      title={'\${pageName}'}
      page={props.props.page}
    >
      <\${pageName} { ...props }/>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return mapCtxToProps(ctx);
}

export default \${pageName}Page;
\``;

export const tpl_src_page_index = {
  tpl
};

export default tplEngineInit(tpl_src_page_index, 'tpl');