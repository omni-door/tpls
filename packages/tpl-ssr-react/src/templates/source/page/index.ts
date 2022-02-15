import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import * as React from 'react';
import Layout from '@components/Layout';
import \${pageName} from '@components/\${pageName}';
import mapCtxToProps from '@utils/mapCtxToProps';
\${ts ? \`/* import types */
import type { MapCtxToProps } from '@utils/mapCtxToProps';
\` : ''}

function \${pageName}Page (props\${ts ? ': MapCtxToProps' : ''}) {
  return (
    <Layout
      title={'\${pageName}'}
      page={props.page}
    >
      <\${pageName} { ...props }/>
    </Layout>
  );
}

\${pageName}Page.getInitialProps = async (ctx\${ts ? ': any' : ''}) => {
  return mapCtxToProps(ctx);
};

export default \${pageName}Page;
\``;

export const tpl_src_page_index = {
  tpl
};

export default tplEngineInit(tpl_src_page_index, 'tpl');