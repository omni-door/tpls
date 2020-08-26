import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`import React, { memo } from 'react';
import MDSource from './\${componentName}.md';
\${style ? \`import styles from './style/\${componentName}.module.\${style === 'all' ? 'scss' : style}';\` : ''}
\${ts ? \`/* import types */
import type { FC } from 'react';

export interface DocsProps {
  lang: string;
}
\` : '' }
export const \${componentName}\${ts ? ': FC<\${componentName}Props>' : ''} = props => {

  return (
    <div
      className={\${style ? styles.docs : 'docs'}}
    >
      <Source />
    </div>
  );
};

export default memo(\${componentName});
\``;

export const tpl_src_component_cp = {
  tpl
};

export default tpl_engine_init(tpl_src_component_cp, 'tpl');