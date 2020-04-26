import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`import React, { PureComponent } from 'react';
\${style ? \`import './style/\${componentName}.\${style === 'all' ? 'less' : style}';\` : ''}

\${ts ? \`export interface \${componentName}Props {}

export interface \${componentName}States {}\` : ''}

export class \${componentName} extends PureComponent\${ts ? \`<\${componentName}Props, \${componentName}States>\` : ''} {
  \${ts ? 'public ' : ''}render() {
    const { children } = this.props;

    return (
      <div
        className='\${componentName}'
      >
        { children }
      </div>
    );
  }
}

export default \${componentName};
\``;

export const tpl_new_class = {
  tpl
};

export default tpl_engine_new(tpl_new_class, 'tpl');