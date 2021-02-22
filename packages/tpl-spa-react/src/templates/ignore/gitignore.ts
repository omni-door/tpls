import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`.idea
.DS_Store
*~
~*

.nyc_output
.docz
.omni_cache
node_modules
lib
es
dist

*.log
\``;

export const tpl_ignore_git = {
  tpl 
};

export default tplEngineInit(tpl_ignore_git, 'tpl');