import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`# \${project_name}

## Run project

\\\`\\\`\\\`shell
npm start
\\\`\\\`\\\`
or
\\\`\\\`\\\`shell
npm run dev
\\\`\\\`\\\`

## Create a Component

\\\`\\\`\\\`shell
npm run new
\\\`\\\`\\\`

### Create a functional Component which name is Button
\\\`\\\`\\\`shell
npm run new Button -- -f
\\\`\\\`\\\`

## Build project

\\\`\\\`\\\`shell
npm run build
\\\`\\\`\\\`

### Bypass all pre-check before building
\\\`\\\`\\\`shell
npm run build -- -n
\\\`\\\`\\\`

## Release project

\\\`\\\`\\\`shell
npm run release
\\\`\\\`\\\`

### Ignoring version of iteration
\\\`\\\`\\\`shell
npm run release -- -i
\\\`\\\`\\\`

### Manual specify version of iteration
\\\`\\\`\\\`shell
npm run release -- -m 0.3.25
\\\`\\\`\\\`

### Bypass all pre-check before release
\\\`\\\`\\\`shell
npm run release -- -n
\\\`\\\`\\\`

**More powerful customizations is in [\${configFileName}](https://github.com/omni-door/cli/blob/master/docs/OMNI.md)**
\``;

export const tpl_readme = {
  tpl
};

export default tpl_engine_init(tpl_readme, 'tpl');