import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import { memo } from 'react';
\${style ? \`import './style/\${componentName}.\${style === 'all' ? 'scss' : style}';\` : ''}
\${ts ? \`/* import types */
import type { FC, PropsWithChildren } from 'react';

export interface \${componentName}Props {}
\` : ''}
export const \${componentName}\${ts ? \`: FC<PropsWithChildren<\${componentName}Props>>\` : ''} = props => {
  const { children } = props;

  return (
    <div
      className='\${componentName}'
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