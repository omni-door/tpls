import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import React, { memo } from 'react';
import MDSource from './\${componentName}.md';
\${style ? \`import styles from './style/\${componentName}.module.\${style === 'all' ? 'scss' : style}';\` : ''}
\${ts ? \`/* import types */
import type { FC, PropsWithChildren } from 'react';

export interface \${componentName}Props {}
\` : '' }
export const \${componentName}\${ts ? \`: FC<PropsWithChildren<\${componentName}Props>>\` : ''} = props => {

  return (
    <div
      className={\${style ? \`styles.\${componentName}\` : \`'\${componentName}'\`}}
    >
      \${componentName} Page
    </div>
  );
};

export default memo(\${componentName});
\``;

export const tpl_src_component_cp = {
  tpl
};

export default tplEngineInit(tpl_src_component_cp, 'tpl');