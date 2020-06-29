import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`import React, { memo\${ts ? ', FC ' : ''}} from 'react';
import propTypes from 'prop-types';
\${ts ? \`import { \${componentName}Props } from './interface';\` : ''}

export const \${componentName}\${ts ? \`: FC<\${componentName}Props>\` : ''} = props => {
  const { children } = props;

  return (
    <div
      className='\${componentName}'
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
  className: propTypes.string
};

export default memo(\${componentName});
\``;

export const tpl_new_functional = {
  tpl
};

export default tpl_engine_new(tpl_new_functional, 'tpl');