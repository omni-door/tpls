import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`.idea
.DS_Store
*~
~*

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

# log files
*.log
*.log.*
\``;

export const tpl_ignore_npm = {
  tpl 
};

export default tpl_engine_init(tpl_ignore_npm, 'tpl');