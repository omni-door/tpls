import { tpl_engine_init } from '@omni-door/utils';
import rules_style_css from './rules_style_css';
import rules_style_less from './rules_style_less';
import rules_style_scss from './rules_style_scss';
import rules_style_all from './rules_style_all';

const tpl = 
`\`\${use_strict}

const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const commonConfig = require(path.resolve(__dirname, 'webpack.config.common.js'));
const { build } = require(path.resolve(__dirname, '../\${configFileName}'));
const {
  srcDir = path.resolve(__dirname, '../src/'),
  outDir = path.resolve(__dirname, '../lib/'),
  hash
} = build || {};

module.exports = merge(commonConfig, {
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
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          reduceIndents: false,
          autoprefixer: false
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        polyfill: {
          chunks: 'all',
          test: /(core-js|regenerator-runtime)/,
          enforce: true,
          name: 'polyfill',
          priority: 110
        },
        vendors: {
          chunks: 'all',
          test: /(react|react-dom|react-router|react-router-dom|redux|react-redux|mobx|mobx-react)/,
          enforce: true,
          name: 'vendors',
          priority: 100
        },
        commons: {
          chunks: 'all',
          test: /(axios)/,
          enforce: true,
          name: 'chunk',
          priority: 90
        },
        asyncs: {
          chunks: 'async',
          enforce: true,
          name: 'chunk.async',
          priority: 80
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: hash ? \\\`[name].[\\\${typeof hash === 'string' ? hash : 'contenthash'}:8].css\\\` : '[name].css'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'parsed',
      reportFilename: './bundle_analysis.html'
    }),
    new HtmlWebpackPlugin({
      path: path.resolve(outDir),
      template: path.resolve(srcDir, 'index.html'),
      minify:{
        removeComments: true,
        collapseWhitespace: true
      },
      filename: hash ? 'index.[hash:8].html' : 'index.html',
      hash: !!hash
    })
  ],
  mode: 'production'
});
\``;

export const tpl_webpack_prod = {
  tpl,
  rules_style_css,
  rules_style_less,
  rules_style_scss,
  rules_style_all
};

export default tpl_engine_init(tpl_webpack_prod, 'tpl');