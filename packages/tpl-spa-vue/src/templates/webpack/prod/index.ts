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
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');\${style ? \`
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;\` : ''}
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const commonConfig = require(path.resolve(__dirname, 'webpack.config.common.js'));
const { build } = require(path.resolve(__dirname, '\${configFileName}'));
const {
  srcDir = path.resolve(__dirname, '../src/'),
  outDir = path.resolve(__dirname, '../lib/'),
  hash
} = build || {};
const publicPath = '';

module.exports = merge(commonConfig, {
  // 需要 source-map 请开启
  // Remove annotation when need source-map
  // devtool: 'cheap-module-source-map',
  cache: {
    type: 'memory'
  },
  output: {
    publicPath
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
      })\${style ? \`,
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        }
      })\` : ''}
    ],
    chunkIds: 'named',
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
        flexible: {
          chunks: 'all',
          test: /amfe-flexible/,
          enforce: true,
          name: 'flexible',
          priority: 105
        },
        vendors: {
          chunks: 'all',
          test: /(vue|vue-router|vuex|mobx|mobx-vue)/,
          enforce: true,
          name: 'vendors',
          priority: 100,
          reuseExistingChunk: true
        },
        commons: {
          chunks: 'all',
          test: /(axios)/,
          enforce: true,
          name: 'chunk',
          priority: 90,
          reuseExistingChunk: true
        },
        asyncs: {
          chunks: 'async',
          enforce: true,
          name: 'chunk.async',
          priority: 80,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
    }),
    \${style ? \`
    new MiniCssExtractPlugin({
      filename: hash ? \\\`[name].[\\\${typeof hash === 'string' ? hash : 'contenthash'}:8].css\\\` : '[name].css'
    }),
    \` : ''}
    // ! 需要分析打包时，请打开注释
    // Remove annotation when need analyze package
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   defaultSizes: 'parsed',
    //   reportFilename: './bundle_analysis.html'
    // }),

    new HtmlWebpackPlugin({
      path: path.resolve(outDir),
      template: path.resolve(srcDir, 'index.html'),
      minify:{
        removeComments: true,
        collapseWhitespace: true
      },
      // filename: hash ? 'index.[hash:8].html' : 'index.html',
      // hash: !!hash,
      filename: 'index.html'
    }),

    // 走统一 CDN 的静态资源
    // The static resources of CDN
    // 能一定程度上减少资源加载时长和构建时长
    // It can reduce some download source and construction time
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'vue',
    //       entry: 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.7/vue.cjs.prod.min.js',
    //       global: 'Vue'
    //     }
    //     {
    //       module: 'vue-router',
    //       entry: 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/4.0.4/vue-router.cjs.prod.min.js',
    //       global: 'VueRouter'
    //     }
    //   ]
    // })\${style ? \`,
    // 将同步的外链 link 注入到 html 中
    // Inject the outer-links into html-style tag
    //! 能一定程度上减少首屏时长
    // It can reduce some first-screen time
    new HTMLInlineCSSWebpackPlugin({
      filter(fileName) {
        //! 注意，若是更改了 splitChunks异步加载 的配置
        // Note that if you change the configuration of splitChunks
        //! 需要过滤掉异步的css文件，否则会导致页面白屏！！！
        // You need to filter out asynchronous CSS files, otherwise the page will be white!!!
        return !fileName.includes('async');
      }
    })
    \` : ''}
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

export default tplEngineInit(tpl_webpack_prod, 'tpl');