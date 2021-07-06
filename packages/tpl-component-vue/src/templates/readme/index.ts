import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`# \${project_name}

English | [简体中文](./README.zh-CN.md)

## Quick start
### Install
\\\`\\\`\\\`shell
\${runScript} add \${project_name}
\\\`\\\`\\\`

### Usage

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