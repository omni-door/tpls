import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import * as React from 'react';
import { headers } from 'next/headers';

import '../src/styles/reset.\${style === 'all' ? 'scss' : style}';

export const metadata = {
  title: 'OMNI-DOOR',
  description: 'Toolset for set up the standard front-end projects',
};

export default async function AppLayout({ children }\${ts ? \`: { children: React.ReactNode }\` : ''}) {
  return <html lang='en'>
    <body>
      {children}
    </body>
  </html>;
}
\``;

export const tpl_src_app_layout = {
  tpl
};

export default tplEngineInit(tpl_src_app_layout, 'tpl');