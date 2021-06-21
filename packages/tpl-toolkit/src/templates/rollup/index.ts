import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`const path = require('path');
const alias = require('@rollup/plugin-alias');

module.exports = function (config) {
  config.forEach(v => {
    // just keep the reference for third-party libs
    v.external = [];

    v.plugins.push(
      alias({
        entries: [
          { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') }
        ]
      })
    )
  })
  return config;
}
\``;

export const tpl_rollup = {
  tpl
};

export default tplEngineInit(tpl_rollup, 'tpl');