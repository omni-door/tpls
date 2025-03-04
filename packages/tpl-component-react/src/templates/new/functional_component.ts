import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import { memo } from 'react';
import classnames from '@/utils/classnames';
\${ts ? \`/* import types */
import type { FC, PropsWithChildren } from 'react';
import type { \${componentName}Props } from './interface';
\` : ''}
export const \${componentName}\${ts ? \`: FC<PropsWithChildren<\${componentName}Props>>\` : ''} = props => {
  const { children, className, onClick, prefixCls = '\${componentName.toLowerCase()}', ...rest } = props;
  const classes = classnames(prefixCls);

  return (
    <div
      {...rest}
      className={classes(void 0, className)}
      onClick={onClick}
    >
      { children }
    </div>
  );
};

export default memo(\${componentName});
\``;

export const tpl_new_functional = {
  tpl
};

export default tplEngineNew(tpl_new_functional, 'tpl');