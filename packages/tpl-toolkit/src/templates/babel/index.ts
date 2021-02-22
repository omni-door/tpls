import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

module.exports = function (api) {
  api.cache(false);
  const presets = [
    '@babel/preset-env'\${ts ? \`,
    '@babel/preset-typescript'\` : ''}
  ];

  const plugins = [];

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