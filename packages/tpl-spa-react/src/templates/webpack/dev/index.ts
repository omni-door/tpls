import { tplEngineInit } from '@omni-door/utils';
import rules_style_css from './rules_style_css';
import rules_style_less from './rules_style_less';
import rules_style_scss from './rules_style_scss';
import rules_style_all from './rules_style_all';

const tpl = 
`\`\${use_strict}

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
\${ts ? "const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');" : ''}
const commonConfig = require('./webpack.config.common.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  cache: {
    type: 'filesystem'
  },
  devtool: false,
  // devtool: 'cheap-module-eval-source-map',
  optimization: {
    minimize: false,
  },
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.join(__dirname, '../src/index.\${ts ? 'tsx' : 'jsx'}')
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../src'),
    publicPath: '/'
  },
  module: {
    rules: [
      \${alter_style({
        css: 'rules_style_css',
        less: 'rules_style_less',
        scss: 'rules_style_scss',
        all: 'rules_style_all',
      })}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '\${project_name}',
      path: path.resolve(__dirname, '../src'),
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ReactRefreshWebpackPlugin(),
    \${ts ? "new ForkTsCheckerWebpackPlugin()" : ''}
  ]
});
\``;

export const tpl_webpack_dev = {
  tpl,
  rules_style_css,
  rules_style_less,
  rules_style_scss,
  rules_style_all
};

export default tplEngineInit(tpl_webpack_dev, 'tpl');