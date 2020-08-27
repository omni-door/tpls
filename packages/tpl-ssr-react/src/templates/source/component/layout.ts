import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`import React, { memo } from 'react';
import Head from 'next/head';
import Link from '\${serverType === 'koa-next' ? '@components/Link' : 'next/link'}';
\${style ? \`import styles from './style/Layout.module.\${style === 'all' ? 'scss' : style}';\` : ''}
\${ts ? \`/* import types */
import type { FC } from 'react';

export interface LayoutProps {
  title?: string;
  className?: string;
  page?: string;
  children?: any
}
\` : '' }
export const Layout\${ts ? ': FC<LayoutProps>' : ''} = props => {
  const { title = 'OMNI-DOOR', className = '', page = 'home', children } = props;

  return (
    <main
      className={\${style ? "[styles['layout'], className].join(' ')" : "'layout'"}}
    >
      <Head>
        <title> { title } </title>
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
      </Head>
      <header className={\${style ? "styles['layout-header']" : "'layout-header'"}}>
        <nav className={\${style ? "styles['layout-header-nav']" : "'layout-header-nav'"}}>
          <Link \${serverType === 'koa-next' ? "page='start'" : "href='/start' as='/start'"}>
            <a>Start</a>
          </Link>
          <Link \${serverType === 'koa-next' ? "page='docs'" : "href='/docs' as='/docs'"}>
            <a>Docs</a>
          </Link>
        </nav>
      </header>
      <div className={\${style ? "styles['layout-content']" : "'layout-content'"}}>
        { children }
      </div>
      <footer className={\${style ? "styles['layout-footer']" : "'layout-footer'"}}>
        Copyright © 2020 @omni-door
      </footer>
    </main>
  );
};

export default memo(Layout);
\``;

export const tpl_src_component_layout = {
  tpl
};

export default tpl_engine_init(tpl_src_component_layout, 'tpl');