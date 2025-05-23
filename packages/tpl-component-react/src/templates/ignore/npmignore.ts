import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`.idea
.DS_Store
*~
~*

.github
.vscode
.husky
.cursor
build
src
*test*
node_modules
.storybook
demo
server
dist-*
docs
DEV*.md

# config files
.eslintignore
.editorconfig
.prettierignore
.eslintrc.js
.gitignore
*.config.js
*.conf.js
tsconfig.json
gulpfile.js
setupTests.js

_config.yml
.nyc_output
.travis.yml
coverage
.nycrc
mocha.*

yarn.lock
package-lock.json
pnpm-lock.yaml

# log files
*.log
*.log.*
\``;

export const tpl_ignore_npm = {
  tpl 
};

export default tplEngineInit(tpl_ignore_npm, 'tpl');