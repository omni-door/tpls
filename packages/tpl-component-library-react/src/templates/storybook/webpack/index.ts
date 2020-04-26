import { tpl_engine_init } from '@omni-door/utils';
import rules_style_css from './rules_style_css';
import rules_style_less from './rules_style_less';
import rules_style_scss from './rules_style_scss';
import rules_style_all from './rules_style_all';

const tpl = 
`\`\${use_strict}

const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {loader: 'babel-loader'}
        ],
        exclude: /node_modules/
      },
      \${ts ? \`{
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('awesome-typescript-loader'),
          },
          {
            loader: require.resolve('react-docgen-typescript-loader'),
          },
        ]
      },\` : ''}
      \${alter_style({
        css: 'rules_style_css',
        less: 'rules_style_less',
        scss: 'rules_style_scss',
        all: 'rules_style_all',
      })}
    ],
  },
  plugins: [],
  mode: 'development',
  resolve: {
    extensions: [\${ts ? '".ts", ".tsx", ' : ''}".js", ".jsx", ".md", \${style ? (style === 'css' ? '".css"' : (style === 'less' ? '".less", ".css"' : '".scss", ".css", ".sass"')) : ''}]
  }
};
\``;

export const tpl_storybook_webpack = {
  tpl,
  rules_style_css,
  rules_style_less,
  rules_style_scss,
  rules_style_all
};

export default tpl_engine_init(tpl_storybook_webpack, 'tpl');
