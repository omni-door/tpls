import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import { PureComponent } from 'react';
import propTypes from 'prop-types';
import classnames from '@/utils/classnames';
\${ts ? \`/* import types */
import type { PropsWithChildren } from 'react';
import type { \${componentName}Props, \${componentName}States } from './interface';
\` : ''}
export class \${componentName} extends PureComponent\${ts ? \`<PropsWithChildren<\${componentName}Props>, \${componentName}States>\` : ''} {
  /**
   * prop-types can make sure the type-check whatever the environment whether or not use typescript
   */
  \${ts ? 'public ' : ''}static propTypes = {
    className: propTypes.string,
    prefixCls: propTypes.string
  };

  \${ts ? 'public ' : ''}render() {
    const { children, className, onClick, prefixCls = '\${componentName.toLowerCase()}' } = this.props;
    const classes = classnames(prefixCls);

    return (
      <div
        className={classes(void 0, className)}
        onClick={onClick}
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