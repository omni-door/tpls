import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`build/
configs/
es/
lib/
dist/
server/
demo/
node_modules/
.storybook/
.out/
**/__test__/
**/stories/
**/*.stories.*

gulpfile.js
.eslintrc.js
*.config.js
*.conf.js
\``;

export const tpl_ignore_eslint = {
  tpl 
};

export default tplEngineInit(tpl_ignore_eslint, 'tpl');