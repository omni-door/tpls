import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);
  const presets = [
    ['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3 }],
    ['@babel/preset-react', { development: api.env('development'), runtime: 'automatic' }]\${ts ? \`,
    '@babel/preset-typescript'\` : ''}
  ];

  const plugins = [
    '../node_modules/@umijs/babel-plugin-auto-css-modules',
    [
      'import',
      {
        'libraryName': 'antd',
        'libraryDirectory': 'es',
        'style': true
      },
      'antd'
    ]
  ];

  if (api.env('development')) {
    plugins.push('react-refresh/babel');
  }

  return {
    presets,
    plugins
  };
};
\``;

export const tpl_babel = {
  tpl
};

export default tplEngineInit(tpl_babel, 'tpl');