import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`# Dev

### Install dependencies
\\\`\\\`\\\`shell
\${install}
\\\`\\\`\\\`

### Run project
\\\`\\\`\\\`shell
\${runScript} dev
\\\`\\\`\\\`

### Create a Module
\\\`\\\`\\\`shell
\${runScript} new
\\\`\\\`\\\`

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

export const tpl_readme_dev = {
  tpl
};

export default tplEngineInit(tpl_readme_dev, 'tpl');