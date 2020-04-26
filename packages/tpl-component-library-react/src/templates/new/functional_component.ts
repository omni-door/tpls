import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`import React, { memo\${ts ? ', FC ' : ''}} from 'react';
\${style ? \`import './style/\${componentName}.\${style === 'all' ? 'less' : style}';\` : ''}

\${ts ? \`export interface \${componentName}Props {}\` : ''}

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

export default memo(\${componentName});
\``;

export const tpl_new_functional = {
  tpl
};

export default tpl_engine_new(tpl_new_functional, 'tpl');