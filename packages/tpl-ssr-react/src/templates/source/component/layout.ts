import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`import React, { memo } from 'react';
import Head from 'next/head';
import Link from '@components/Link';
\${style ? \`import styles from './style/Layout.module.\${style === 'all' ? 'scss' : style}';\` : ''}
\${ts ? \`/* import types */
import type { FC } from 'react';

export interface BasicLayoutProps {
  title?: string;
  className?: string;
  page?: string;
  children?: any
}
\` : '' }
export const BasicLayout\${ts ? ': FC<BasicLayoutProps>' : ''} = props => {
  const { title = 'OMNI-DOOR', className = '', page = 'home', children } = props;

  return (
    <Layout
      className={[styles['layout'], className].join(' ')}
    >
      <Head>
        <title> { title } </title>
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
      </Head>
      <header className={styles['layout-header']}>
        <nav className={styles['layout-header-nav']}>
          <Link page='start'>
            <a>Start</a>
          </Link>
          <Link page='docs'>
            <a>Docs</a>
          </Link>
        </nav>
      </header>
      <main className={styles['layout-content']}>
        { children }
      </main>
      <footer className={styles['layout-footer']}>
        Copyright © 2020 @omni-door
      </footer>
    </Layout>
  );
};

export default memo(BasicLayout);
\``;

export const tpl_src_component_layout = {
  tpl
};

export default tpl_engine_init(tpl_src_component_layout, 'tpl');