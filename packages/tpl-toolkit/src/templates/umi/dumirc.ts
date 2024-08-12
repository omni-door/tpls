import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`export default {
  title: '\${project_name.toLowerCase()}',
  publicPath: '/',
  history: { type: 'hash' },
  resolve: {
    atomDirs: [
      { type: 'docs', dir: 'src' },
    ]
  },
  themeConfig: {
    logo: 'https://omnidoor.org/img/logo.png',
    name: '\${project_name.toLowerCase()}',
    editLink: false,
    nav: [
      { title: 'Docs', link: '/docs' }
    ],
    footer: \\\`<footer>OMNI-DOOR TEAM ©omni-door</footer>\\\`,
    prefersColor: { default: 'auto' },
  },
  styles: [\\\`.dumi-default-header-left { width: auto !important; margin-right: 16px; }\\\`],
  exportStatic: {
    extraRoutePaths: ['/']
  }
};
\``;

export const tpl_dumirc = {
  tpl
};

export default tplEngineInit(tpl_dumirc, 'tpl');