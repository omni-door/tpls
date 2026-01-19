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
  // Uncomment to enable source maps.
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
          test: /(react|react-dom|react-router|react-router-dom|redux|react-redux|mobx|mobx-react)/,
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
    \${style ? \`
    new MiniCssExtractPlugin({
      filename: hash ? \\\`[name].[\\\${typeof hash === 'string' ? hash : 'contenthash'}:8].css\\\` : '[name].css'
    }),
    \` : ''}
    // Uncomment to analyze bundle output.
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

    // Serve static assets from a shared CDN.
    // This can reduce asset load time and build time.
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js',
    //       global: 'React'
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
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
    // })\${style ? \`,
    // Inline synchronous external CSS links into the HTML.
    //! Can reduce time to first paint.
    new HTMLInlineCSSWebpackPlugin({
      filter(fileName) {
        //! If you change the splitChunks async configuration,
        //! filter out async CSS files to avoid a blank page.
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