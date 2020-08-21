import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`import React, { memo } from 'react';
\${style ? \`import './style/\${pageName}.\${style === 'all' ? 'scss' : style}';\` : ''}
\${ts ? \`/* import types */
import type { FC } from 'react';
import type { PageProps } from '@/@types';

export interface \${pageName}Props extends PageProps {}
\` : ''}
export const \${pageName}\${ts ? \`: FC<\${pageName}Props>\` : ''} = props => {
  return (
    <div
      className='\${pageName}'
    >
      \${content}
    </div>
  );
};

export default memo(\${pageName});
\``;

export const tpl_src_page_page = {
  tpl
};

export default tpl_engine_init(tpl_src_page_page, 'tpl');