import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

module.exports = function (api) {
  api.cache(false);
  const presets = [
    '@babel/preset-env',
    '@babel/preset-react'\${ts ? \`,
    '@babel/preset-typescript'\` : ''}
  ];

  const plugins = [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties'
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
        [
          '@babel/plugin-transform-runtime',
          { useESModules: true }
        ]
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