import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`.idea
.DS_Store
*~
~*

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build
/dist

# local env files
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

*.log
\``;

export const tpl_ignore_git = {
  tpl 
};

export default tpl_engine_init(tpl_ignore_git, 'tpl');