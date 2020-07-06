import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

const path = require('path');

module.exports = {
  port: 6200,
  root: '/bisheng/',
  theme: 'bisheng-theme-one',
  output: 'dist-bisheng',
  themeConfig: {
    home: '/',
    sitename: '\${project_name}',
    tagline: 'THE OMNI PROJECT',
    github: '',
  },
  plugins: ['bisheng-plugin-react?lang=jsx']
};
\``;

export const tpl_bisheng = {
  tpl
};

export default tpl_engine_init(tpl_bisheng, 'tpl');