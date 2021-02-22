import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import '../src/styles/reset.\${style === 'all' ? 'scss' : style}';

function MyApp({ Component, pageProps }\${ts ? ': any' : ''}) {
  return <Component { ...pageProps } />;
}

export default MyApp;
\``;

export const tpl_src_page_app = {
  tpl
};

export default tplEngineInit(tpl_src_page_app, 'tpl');