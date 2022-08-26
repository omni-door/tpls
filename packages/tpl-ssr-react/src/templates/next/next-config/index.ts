import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

const path = require('path');
const withLess = require('next-with-less');
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
  withLess({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]'
    },
    lessLoaderOptions: {
      javascriptEnabled: true
    }
  }),
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
  tpl
};

export default tplEngineInit(tpl_next_config, 'tpl');