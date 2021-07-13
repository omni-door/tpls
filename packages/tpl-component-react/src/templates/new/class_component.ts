import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import classnames from '@utils/classnames';
\${ts ? \`/* import types */
import type { \${componentName}Props, \${componentName}States } from './interface';
\` : ''}
export class \${componentName} extends PureComponent\${ts ? \`<\${componentName}Props, \${componentName}States>\` : ''} {
  /**
   * 使用 prop-types 是为了确保即便宿主环境没有使用 typescript 也依然能够进行类型检查
   * prop-types can make sure the type-check whatever the environment whether or not use typescript
   */
  \${ts ? 'public ' : ''}static propTypes = {
    className: propTypes.string,
    prefixCls: propTypes.string
  };

  \${ts ? 'public ' : ''}render() {
    const { children, className, prefixCls = '\${componentName.toLowerCase()}' } = this.props;
    const classes = classnames(prefixCls);

    return (
      <div
        className={classes(void 0, className)}
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