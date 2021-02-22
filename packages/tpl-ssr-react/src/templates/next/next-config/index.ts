import { tplEngineInit } from '@omni-door/utils';
import style_import_css from './style_import_css';
import style_import_less from './style_import_less';
import style_import_scss from './style_import_scss';
import style_import_all from './style_import_all';
import style_plugin_css from './style_plugin_css';
import style_plugin_less from './style_plugin_less';
import style_plugin_scss from './style_plugin_scss';
import style_plugin_all from './style_plugin_all';

const tpl = 
`\`\${use_strict}

const path = require('path');
\${!(style === 'css' && serverType !== 'koa-next' && serverType !== 'koa-nuxt') ? alter_style({
  css: 'style_import_css',
  less: 'style_import_less',
  scss: 'style_import_scss',
  all: 'style_import_all',
}) : ''}
const withTM = require('next-transpile-modules');
const withPlugin = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const merge = require('webpack-merge');
const webpackConfig = require('./configs/webpack.config.js');
const configs = require('./configs/omni.config');
const isProd = process.env.NODE_ENV === 'production';

module.exports = withPlugin([
  \${!(style === 'css' && serverType !== 'koa-next' && serverType !== 'koa-nuxt') ? alter_style({
    css: 'style_plugin_css',
    less: 'style_plugin_less',
    scss: 'style_plugin_scss',
    all: 'style_plugin_all',
  }) : ''}
  withTM([]),
  withBundleAnalyzer
], {
  // assetPrefix: isProd ? 'https://cdn.domain.com' : '',
  target: 'server',
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  distDir: path.relative(__dirname, configs.build.outDir) || 'dist',
  reactStrictMode: true,
  webpack: config => merge(config, webpackConfig)
});
\``;

export const tpl_next_config = {
  tpl,
  style_import_css,
  style_import_less,
  style_import_scss,
  style_import_all,
  style_plugin_css,
  style_plugin_less,
  style_plugin_scss,
  style_plugin_all
};

export default tplEngineInit(tpl_next_config, 'tpl');