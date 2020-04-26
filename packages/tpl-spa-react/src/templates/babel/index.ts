import { tpl_engine_init } from '@omni-door/utils';
import preset_typescript from './preset_typescript';

const tpl = 
`\`\${use_strict}

module.exports = function (api) {
  api.cache(false);
  const presets = [
    ['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3 }],
    '@babel/preset-react'\${alter('ts', 'preset_typescript')}
  ];

  const plugins = [
    './node_modules/@umijs/babel-plugin-auto-css-modules'
  ];

  return {
    presets,
    plugins
  };
};
\``;

export const tpl_babel = {
  tpl,
  preset_typescript
};

export default tpl_engine_init(tpl_babel, 'tpl');