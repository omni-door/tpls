import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`.idea
.DS_Store
*~
~*

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

# config files
.eslintignore
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
mocha.opts
doczrc.js

yarn.lock
package-lock.json

# log files
*.log
*.log.*
\``;

export const tpl_ignore_npm = {
  tpl 
};

export default tplEngineInit(tpl_ignore_npm, 'tpl');