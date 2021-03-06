import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`# \${project_name}

English | [简体中文](./README.zh-CN.md)

## Quick start
### Install dependencies
\\\`\\\`\\\`shell
\${install}
\\\`\\\`\\\`

### Develop project
\\\`\\\`\\\`shell
\${runScript} dev
\\\`\\\`\\\`

### Create a Component

\\\`\\\`\\\`shell
\${runScript} new
\\\`\\\`\\\`

*Create a functional Component which name is Button👇*
\\\`\\\`\\\`shell
\${runScript} new Button \${paramScript}f
\\\`\\\`\\\`

---

## Build and Run
### Build
\\\`\\\`\\\`shell
\${runScript} build
\\\`\\\`\\\`

*Bypass all pre-check before building👇*
\\\`\\\`\\\`shell
\${runScript} build \${paramScript}n
\\\`\\\`\\\`

### Run project in production env
\\\`\\\`\\\`shell
\${runScript} start
\\\`\\\`\\\`

**More powerful customizations is in [\${configFileName}](https://github.com/omni-door/cli/blob/master/docs/OMNI.md)**
\``;

export const tpl_readme = {
  tpl
};

export default tplEngineInit(tpl_readme, 'tpl');
