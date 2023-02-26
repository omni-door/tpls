import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import React, { PureComponent } from 'react';
\${style ? \`import styles from './style/\${componentName}.module.\${style === 'all' ? 'scss' : style}';\` : ''}
\${ts ? \`/* import types */
import type { PropsWithChildren } from 'react';

export interface \${componentName}Props {}

export interface \${componentName}States {}
\` : ''}
export class \${componentName} extends PureComponent\${ts ? \`<PropsWithChildren<\${componentName}Props>, \${componentName}States>\` : ''} {
  \${ts ? 'public ' : ''}render() {
    const { children } = this.props;

    return (
      <div
        className={\${style ? \`styles.\${componentName}\` : \`'\${componentName}'\`}}
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

export default tplEngineNew(tpl_new_class, 'tpl');