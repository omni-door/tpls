import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

module.exports = function (api) {
  api.cache(false);
  const presets = [
    'next/babel'
  ];

  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ];

  return {
    presets,
    plugins
  };
};
\``;

export const tpl_babel = {
  tpl
};

export default tpl_engine_init(tpl_babel, 'tpl');