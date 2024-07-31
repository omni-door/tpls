import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

module.exports = function (api) {
  api.cache(false);
  const presets = [
    '@babel/preset-env',
    '@vue/cli-plugin-babel/preset'\${ts ? \`,
    '@babel/preset-typescript',
    'babel-preset-typescript-vue3'\` : ''}
  ];

  const plugins = [
    '@vue/babel-plugin-jsx',
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }]
  ];

  const env = {
    es: {
      presets: [
        [
          '@babel/preset-env',
          { modules: false }
        ]
      ],
      plugins: [
        ['@babel/plugin-transform-runtime',{
          useESModules: true
        }],
        ['@babel/plugin-proposal-decorators', {
          legacy: true
        }],
        ['@babel/plugin-proposal-class-properties', {
          loose: true
        }],
        ['@babel/plugin-proposal-private-property-in-object', {
          loose: true
        }],
        ['@babel/plugin-proposal-private-methods', {
          loose: true
        }]
      ]
    }
  };

  return {
    presets,
    plugins,
    env
  };
};
\``;

export const tpl_babel = {
  tpl
};

export default tplEngineInit(tpl_babel, 'tpl');