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

# config files
.eslintignore
.eslintrc.js
.gitignore
*.config.js
*.conf.js
tsconfig.json

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