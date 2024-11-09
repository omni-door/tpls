import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import * as React from 'react';
import '../src/styles/reset.\${style === 'all' ? 'scss' : style}';
\${ts ? \`/* import types */
import type { AppProps } from 'next/app';

\` : ''}
function MyApp({ Component, pageProps }\${ts ? ': AppProps' : ''}) {
  return <Component { ...pageProps } />;
}

export default MyApp;
\``;

export const tpl_src_page_app = {
  tpl
};

export default tplEngineInit(tpl_src_page_app, 'tpl');