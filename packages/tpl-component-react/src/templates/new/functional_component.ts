import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import React, { memo } from 'react';
import propTypes from 'prop-types';
import classnames from '@utils/classnames';
\${ts ? \`/* import types */
import type { FC, PropsWithChildren } from 'react';
import type { \${componentName}Props } from './interface';
\` : ''}
export const \${componentName}\${ts ? \`: FC<PropsWithChildren<\${componentName}Props>>\` : ''} = props => {
  const { children, className, prefixCls = '\${componentName.toLowerCase()}' } = props;
  const classes = classnames(prefixCls);

  return (
    <div
      className={classes(void 0, className)}
    >
      { children }
    </div>
  );
};

/**
 * 使用 prop-types 是为了确保即便宿主环境没有使用 typescript 也依然能够进行类型检查
 * prop-types can make sure the type-check whatever the environment whether or not use typescript
 */
\${componentName}.propTypes = {
  className: propTypes.string,
  prefixCls: propTypes.string
};

export default memo(\${componentName});
\``;

export const tpl_new_functional = {
  tpl
};

export default tplEngineNew(tpl_new_functional, 'tpl');