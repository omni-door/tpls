import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import { memo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
\${style ? \`import styles from './style/Layout.module.\${style === 'all' ? 'scss' : style}';\` : ''}
\${ts ? \`/* import types */
import type { FC, PropsWithChildren } from 'react';

export interface LayoutProps {
  title?: string;
  className?: string;
  page?: string;
  children?: any
}
\` : '' }
export const Layout\${ts ? ': FC<PropsWithChildren<LayoutProps>>' : ''} = props => {
  const { title = 'OMNI-DOOR', className = '', page = 'home', children } = props;

  return (
    <main
      className={\${style ? "[styles['layout'], className].join(' ')" : "'layout'"}}
    >
      <Head>
        <title>{ title }</title>
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
      </Head>
      <header className={\${style ? "styles['layout-header']" : "'layout-header'"}}>
        <nav className={\${style ? "styles['layout-header-nav']" : "'layout-header-nav'"}}>
          <Link href='/' as='/'>
            Home
          </Link>
          <Link href='/start' as='/start'>
            Start
          </Link>
          <Link href='/docs' as='/docs'>
            Docs
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

export default tplEngineInit(tpl_src_component_layout, 'tpl');