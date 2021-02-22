import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`---
name: \${componentName}
route: /\${componentName}
---
import { Playground, Props } from 'docz';
import { \${componentName} } from './index';
\${style ? "import './style';" : ''}

# \${componentName} 组件

<Props of={\${componentName}} />

## Demo

<Playground>

  <\${componentName} />

</Playground>
\``;

export const tpl_new_mdx = {
  tpl
};

export default tplEngineNew(tpl_new_mdx, 'tpl');