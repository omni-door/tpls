import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

module.exports = function (config) {
  const { task, params } = config;
  task.push(function () {
    return Promise.resolve();
  });
  return task;
}
\``;

export const tpl_gulpfile = {
  tpl
};

export default tplEngineInit(tpl_gulpfile, 'tpl');