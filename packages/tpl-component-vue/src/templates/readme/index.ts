import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`# \${project_name}

English | [简体中文](./README.zh-CN.md)

## Quick start
### Install
\\\`\\\`\\\`shell
npm i -S \${project_name}
# or
yarn add \${project_name}
# or
pnpm i -S \${project_name}
\\\`\\\`\\\`

### Usage
\\\`\\\`\\\`js
import UI from '\${project_name}';
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