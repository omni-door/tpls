import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`import React, { memo\${ts ? ', FC ' : ''}} from 'react';
\${ts ? "import { PageProps } from '@/@types';" : '' }
\${style ? \`import './style/\${pageName}.\${style === 'all' ? 'scss' : style}';\` : ''}

\${ts ? \`export interface \${pageName}Props extends PageProps {}\` : ''}

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