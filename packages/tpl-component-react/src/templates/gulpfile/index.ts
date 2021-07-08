import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

module.exports = function (config) {
  const { task, params } = config;
  task.pop();
  return task;
}
\``;

export const tpl_gulpfile = {
  tpl
};

export default tplEngineInit(tpl_gulpfile, 'tpl');