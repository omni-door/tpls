import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import React, { memo } from 'react';
import { Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from '@/routes';
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
      {
        props.routes
          ? <Switch>
            {
              props.routes.map((route, i) => <RouteWithSubRoutes key={i} { ...route } />)
            }
          </Switch>
          : null
      }
    </div>
  );
};

export default memo(\${pageName});
\``;

export const tpl_src_page_page_nest = {
  tpl
};

export default tplEngineInit(tpl_src_page_page_nest, 'tpl');