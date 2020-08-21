import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`import React, { PureComponent } from 'react';
\${style ? \`import './style/\${componentName}.\${style === 'all' ? 'scss' : style}';\` : ''}
\${ts ? \`/* import types */
import type { RouteComponentProps } from 'react-router-dom';
import type { PageProps } from '@/@types';

export interface \${componentName}Props extends PageProps, RouteComponentProps<{
  id?: string;
}> {}

export interface \${componentName}States {}
\` : '' }
export class \${componentName} extends PureComponent\${ts ? \`<\${componentName}Props, \${componentName}States>\` : ''} {
  \${ts ? 'public ' : ''}render() {
    const { match: { params } } = this.props;

    return (
      <div
        className='\${componentName}'
      >
        { \\\`The params is：\\\${params?.id}\\\` }
      </div>
    );
  }
}

export default \${componentName};
\``;

export const tpl_src_component_cp = {
  tpl
};

export default tpl_engine_init(tpl_src_component_cp, 'tpl');