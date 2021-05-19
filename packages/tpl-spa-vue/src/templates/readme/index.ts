import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`# \${project_name}

English | [简体中文](./README.zh-CN.md)

## Quick start
### Install dependencies
\\\`\\\`\\\`shell
\${install}
\\\`\\\`\\\`

### Run project
\\\`\\\`\\\`shell
\${runScript} start
\\\`\\\`\\\`
or
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

## Build and Release
### Build
\\\`\\\`\\\`shell
\${runScript} build
\\\`\\\`\\\`

*Bypass all pre-check before building👇*
\\\`\\\`\\\`shell
\${runScript} build \${paramScript}n
\\\`\\\`\\\`

### Release
\\\`\\\`\\\`shell
\${runScript} release
\\\`\\\`\\\`

*Ignoring version of iteration👇*
\\\`\\\`\\\`shell
\${runScript} release \${paramScript}i
\\\`\\\`\\\`

*Manual specify version of iteration to 0.3.25👇*
\\\`\\\`\\\`shell
\${runScript} release \${paramScript}m 0.3.25
\\\`\\\`\\\`

*Bypass all pre-check before release👇*
\\\`\\\`\\\`shell
\${runScript} release \${paramScript}n
\\\`\\\`\\\`

**More powerful customizations is in [\${configFileName}](https://github.com/omni-door/cli/blob/master/docs/OMNI.md)**
\``;

export const tpl_readme = {
  tpl
};

export default tplEngineInit(tpl_readme, 'tpl');