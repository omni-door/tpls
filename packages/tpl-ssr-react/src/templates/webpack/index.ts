import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@pages': path.resolve(__dirname, '../pages'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@api': path.resolve(__dirname, '../src/api'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@ctx': path.resolve(__dirname, '../src/context'),
      '@locale': path.resolve(__dirname, '../src/locales')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less', '.scss', '.sass', '.md']
  }
};
\``;

export const tpl_webpack = {
  tpl
};

export default tpl_engine_init(tpl_webpack, 'tpl');