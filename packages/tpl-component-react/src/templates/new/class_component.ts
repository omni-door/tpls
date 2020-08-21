import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
\${ts ? \`/* import types */
import type { \${componentName}Props, \${componentName}States } from './interface';
\` : ''}
export class \${componentName} extends PureComponent\${ts ? \`<\${componentName}Props, \${componentName}States>\` : ''} {
  /**
   * 使用 prop-types 是为了确保即便宿主环境没有使用 typescript 也依然能够进行类型检查
   * prop-types can make sure the type-check whatever the environment whether or not use typescript
   */
  \${ts ? 'public ' : ''}static propTypes = {
    className: propTypes.string
  };

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