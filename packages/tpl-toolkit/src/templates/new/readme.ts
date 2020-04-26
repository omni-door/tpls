import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`# \${componentName}

## Example

\\\`\\\`\\\`\${ts ? 'typescript' : 'javascript'}
\${componentName}()
\\\`\\\`\\\`
\``;

export const tpl_new_readme = {
  tpl
};

export default tpl_engine_new(tpl_new_readme, 'tpl');

