import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import React from 'react';
import { useParams } from 'react-router-dom';
\${style ? \`import './style/\${componentName}.\${style === 'all' ? 'scss' : style}';\` : ''}
\${ts ? \`/* import types */
import type { FC, PropsWithChildren } from 'react';
import type { PageProps } from '@/@types';

export interface \${componentName}Props extends PageProps, PropsWithChildren {}
\` : '' }
export const \${componentName}\${ts ? \`: FC<DetailProps> \` : ''}= props => {
  const params = useParams\${ts ? '<{ id: string }>()' : '()'};

  return (
    <div
      className='\${componentName}'
    >
      { \\\`params is: \\\${params?.id}\\\` }
    </div>
  );
}

export default \${componentName};
\``;

export const tpl_src_component_cp = {
  tpl
};

export default tplEngineInit(tpl_src_component_cp, 'tpl');