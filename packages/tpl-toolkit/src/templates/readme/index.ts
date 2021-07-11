import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`# \${project_name}

English | [简体中文](./README.zh-CN.md)

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

## Dev
For debugging or maintenance, you can clone the whole git repository and run the project:

\\\`\\\`\\\`shell
git clone --depth 1

\${install} && \${runScript} dev
\\\`\\\`\\\`

[More Detials](./DEV.md)
\``;

export const tpl_readme = {
  tpl
};

export default tplEngineInit(tpl_readme, 'tpl');