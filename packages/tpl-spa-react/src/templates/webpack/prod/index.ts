import { tpl_engine_init } from '@omni-door/utils';
import rules_style_css from './rules_style_css';
import rules_style_less from './rules_style_less';
import rules_style_scss from './rules_style_scss';
import rules_style_all from './rules_style_all';

const tpl = 
`\`\${use_strict}

const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const commonConfig = require(path.resolve(__dirname, 'webpack.config.common.js'));
const { build } = require(path.resolve(__dirname, '\${configFileName}'));
const {
  srcDir = path.resolve(__dirname, '../src/'),
  outDir = path.resolve(__dirname, '../lib/'),
  hash
} = build || {};

module.exports = merge(commonConfig, {
  // 需要 source-map 请开启
  // Remove annotation when need source-map
  // devtool: 'cheap-module-source-map',
  cache: {
    type: 'memory'
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
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          reduceIndents: false,
          autoprefixer: false
        }
      })
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
    //       module: 'react',
    //       entry: 'https://cdnjs.cloudflare.com/ajax/libs/react/17.0.1/umd/react.production.min.js',
    //       global: 'React'
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.1/umd/react-dom.production.min.js',
    //       global: 'ReactDOM'
    //     },
    //     {
    //       module: 'react-router',
    //       entry: 'https://cdnjs.cloudflare.com/ajax/libs/react-router/5.2.0/react-router.min.js',
    //       global: 'ReactRouter'
    //     },
    //     {
    //       module: 'react-router-dom',
    //       entry: 'https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.2.0/react-router-dom.min.js',
    //       global: 'ReactRouterDOM'
    //     }
    //   ]
    // }),

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