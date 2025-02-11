import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import * as React from 'react';
import Layout from '@components/Layout';
import \${pageName} from '@components/\${pageName}';

const \${pageName}Page = () => {
  return (
    <Layout
      title={'\${pageName}'}
      page='/\${pageName.toLowerCase()}'
    >
      <\${pageName} />
    </Layout>
  );
};

// regenerate page every day
export const config = {
  revalidate: 86400,
};

export default \${pageName}Page;
\``;

export const tpl_src_app_page = {
  tpl
};

export default tplEngineInit(tpl_src_app_page, 'tpl');