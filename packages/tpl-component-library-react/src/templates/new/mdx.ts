import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`---
name: \${componentName}
route: /\${componentName}
---
import { Playground, Props } from 'docz';
import { \${componentName} } from './index';

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

export default tpl_engine_new(tpl_new_mdx, 'tpl');