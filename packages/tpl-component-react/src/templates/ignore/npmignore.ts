import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`.idea
.DS_Store
*~
~*

.github
.vscode
build
src
*test*
node_modules
.omni_cache
.storybook
.docz
demo
server
dist-*
docs

# config files
.eslintignore
.editorconfig
.prettierignore
.eslintrc.js
.gitignore
*.config.js
*.conf.js
tsconfig.json

_config.yml
.nyc_output
.travis.yml
coverage
.nycrc
mocha.*
doczrc.js

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