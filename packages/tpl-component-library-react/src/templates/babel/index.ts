import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

module.exports = function (api) {
  api.cache(false);
  const presets = [
    '@babel/preset-env',
    '@babel/preset-react'\${ts ? \`,
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

export default tpl_engine_init(tpl_babel, 'tpl');