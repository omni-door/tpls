import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

module.exports = {
  plugins: [
    require('autoprefixer')()\${layout === 'rem' ? \`,
    // https://github.com/pigcan/postcss-plugin-px2rem
    require('postcss-plugin-px2rem')({
      replace: true,
      rootValue: 37.5,
      unitPrecision: 10,
      propBlackList: ['border', 'border-width']
    })\` : layout === 'viewport' ? \`,
    // https://github.com/lkxian888/postcss-px-to-viewport-8-plugin
    require('postcss-px-to-viewport-8-plugin')({
      viewportWidth: 375, // Viewport width (number).
      viewportHeight: 1334, // Viewport height (number).
      unitPrecision: 3, // Decimal precision (number).
      viewportUnit: 'vw', // Unit to convert to (string).
      fontViewportUnit: 'vw', // Font unit to convert to (string).
      selectorBlackList: ['.ignore', '.hairlines'], // Class names to exclude from conversion (array).
      minPixelValue: 1, // Minimum pixel value to convert (number).
      mediaQuery: false // Allow px conversion in media queries (true/false).
    })\` : ''}
  ]
};
\``;

export const tpl_postcss = {
  tpl 
};

export default tplEngineInit(tpl_postcss, 'tpl');
