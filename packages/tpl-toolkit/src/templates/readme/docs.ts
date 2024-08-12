import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`# \${project_name}

## Quick start
### NPM
\\\`\\\`\\\`shell
npm i -S \${project_name}
# or
yarn add \${project_name}
# or
pnpm i -S \${project_name}
\\\`\\\`\\\`

\\\`\\\`\\\`js
import Tool from '\${project_name}';
\\\`\\\`\\\`

### CDN
\\\`\\\`\\\`html
<script src="https://unpkg.com/\${project_name}@latest/umd/\${project_name.toLowerCase()}.min.js"></script>
\\\`\\\`\\\`
\``;

export const tpl_docs = {
  tpl
};

export default tplEngineInit(tpl_docs, 'tpl');