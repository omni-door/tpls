import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`# \${componentName}

## APIs
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| className(optional) | The extra classname for \${componentName} | string | - |
| prefixCls(optional) | The classname prefix for wholly control the component style | string | \\\`'\${componentName.toLowerCase()}'\\\` | 


## Example

\\\`\\\`\\\`\${ts ? 'tsx' : 'jsx'}
import { \${componentName} } from './\${componentName}';

<\${componentName} />
\\\`\\\`\\\`
\``;

export const tpl_new_readme = {
  tpl
};

export default tplEngineNew(tpl_new_readme, 'tpl');