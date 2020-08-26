import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`# \${componentName}

## Content
This is markdown content
\``;

export const tpl_src_component_md = {
  tpl
};

export default tpl_engine_init(tpl_src_component_md, 'tpl');