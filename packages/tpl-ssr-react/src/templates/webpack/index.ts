import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@pages': path.resolve(__dirname, '../pages'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@utils': path.resolve(__dirname, '../src/utils')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less', '.scss', '.sass', '.md']
  }
};
\``;

export const tpl_webpack = {
  tpl
};

export default tplEngineInit(tpl_webpack, 'tpl');