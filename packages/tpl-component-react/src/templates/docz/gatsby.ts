import { tplEngineInit } from '@omni-door/utils';

const tpl_less = `"'gatsby-plugin-less'"`;
const tpl_scss = `"'gatsby-plugin-sass'"`;
const tpl_all = `\`'${tpl_less}',
    '${tpl_scss}'
\``;

const tpl = 
`\`\${use_strict}

module.exports = {
  plugins: [
    'gatsby-theme-docz',
    \${alter_style({
      less: 'tpl_less',
      scss: 'tpl_scss',
      all: 'tpl_all'
    })}
  ]
};
\``;

export const tpl_gatsby = {
  tpl,
  tpl_less,
  tpl_scss,
  tpl_all
};

export default tplEngineInit(tpl_gatsby, 'tpl');