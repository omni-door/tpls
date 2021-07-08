import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}
const gulp = require('gulp');

module.exports = function (config) {
  const { task, params } = config;

  const [ compileCJS, compileES, compileSFC, ...rest ] = task;
  return [ gulp.series(compileCJS, compileES), ...rest ];
}
\``;

export const tpl_gulpfile = {
  tpl
};

export default tplEngineInit(tpl_gulpfile, 'tpl');