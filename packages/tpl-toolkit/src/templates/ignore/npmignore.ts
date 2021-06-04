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
dist
dist.zip

# config files
.eslintignore
.editorconfig
.prettierignore
.eslintrc.js
.gitignore
*.config.js
*.conf.js
tsconfig.json
.umirc*
.env

_config.yml
.nyc_output
.travis.yml
coverage
.nycrc
mocha.opts

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