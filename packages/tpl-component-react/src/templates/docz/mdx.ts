import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`---
name: -\${project_name}
route: /
---
# \${project_name}

## 导航
| 组件(Component) | 开发/维护(Developer/Maintainer) |
| --- | --- |
\``;

export const tpl_docz_mdx = {
  tpl
};

export default tplEngineInit(tpl_docz_mdx, 'tpl');