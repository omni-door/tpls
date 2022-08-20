import { tplEngineInit } from '@omni-door/utils';
import preset_typescript from './preset_typescript';

const tpl = 
`\`\${use_strict}

module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);
  const presets = [
    ['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3 }],
    ['@babel/preset-react', { development: api.env('development'), runtime: 'automatic' }]\${alter('ts', 'preset_typescript')}
  ];

  const plugins = [
    \${style ? \`'../node_modules/@umijs/babel-plugin-auto-css-modules'\` : ''}
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
  tpl,
  preset_typescript
};

export default tplEngineInit(tpl_babel, 'tpl');