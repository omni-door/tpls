import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${ts ? "///<reference types='webpack-env' />" : ''}
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { StrictMode, useLayoutEffect, useState } from 'react';
\${qiankun ? \`import { unmountComponentAtNode } from 'react-dom';
import { createRoot } from 'react-dom/client';\` : \`import { createRoot } from 'react-dom/client';\` }
import { HashRouter as Router, Switch, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import routes, { RouteWithSubRoutes } from './routes';
\${style ? \`import styles from './index.\${style === 'all' ? 'scss' : style}';
import './reset.\${style === 'all' ? 'scss' : style}';\` : ''}
\${ts ? \`/* import types */
import type { MenuProps } from 'antd';
\` : ''}
const { Header, Content, Footer, Sider } = Layout;

const SiderMenu = () => {
  const [ openedKeys, setOpenedKeys ] = useState(['/']);
  const [ selectedKeys, setSelectedKeys ] = useState(['/']);
  const location = useLocation();
  useLayoutEffect(() => {
    const { pathname } = location;
    setSelectedKeys([pathname]);
    setOpenedKeys([\\\`/\\\${pathname.split('/')[1]}\\\`]);
  }, [location]);

  const menuItems\${ts ? ': MenuProps['items'] ': ''}= [
    {
      key: '/',
      label: <Link to='/'>
        Home
      </Link>
    },
    {
      key: '/detail',
      label: '详情页',
      children: [
        {
          key: '/detail/',
          label: <Link to='/detail'>
            Detail
          </Link>
        },
        {
          key: '/detail/2',
          label: <Link to='/detail/2'>
            Detail-2
          </Link>
        },
        {
          key: '/detail/6',
          label: <Link to='/detail/6'>
            Detail-6
          </Link>
        }
      ]
    }
  ];

  return (
    <Sider className={\${style ? 'styles.sider' : "'sider'"}} theme='light'>
      <Menu
        selectedKeys={selectedKeys}
        openKeys={openedKeys}
        mode='inline'
        onClick={e => setSelectedKeys([e.key\${ts ? ' as string': ''}])}
        onOpenChange={currOpenKeys => setOpenedKeys([...currOpenKeys\${ts ? ' as string[]': ''}])}
        items={menuItems}
      />
    </Sider>
  );
};

const App = () => {
  return (
    <Layout>
      <SiderMenu />
      <Layout className={\${style ? 'styles.main' : "'main'"}}>
        <Header className={\${style ? "styles['main-header']" : "'main-header'"}}>
          I'm Header
        </Header>
        <Content className={\${style ? "styles['main-content']" : "'main-content'"}}>
          <Switch>
            {
              routes.map((route, i) => <RouteWithSubRoutes key={i} { ...route } />)
            }
          </Switch>
        </Content>
        <Footer className={\${style ? "styles['main-footer']" : "'main-footer'"}}>
          OMNI-DOOR TEAM ©omni-door
        </Footer>
      </Layout>
    </Layout>
  );
};

\${ qiankun ? \`let container\${ts ? ': null | HTMLElement ' : ''}= null;
function renderApp (container\${ts ? ': Element | DocumentFragment | null' : ''}, props\${ts ? ': any' : ''}) {
  if (!container) {
    container = document.getElementById('root');
    const root = createRoot(container\${ts ? '!)' : ')'};
    root.render(<Router><StrictMode><App /></StrictMode></Router>);
  }
}

export async function bootstrap() {
  console.info('[\${project_name}]: bootstrap');
}

export async function mount(props\${ts ? ': any' : ''}) {
  console.info('[\${project_name}]: mount ', props);
  const { container } = props || {};
  renderApp(container ? container.querySelector('#root') : document.getElementById('root'), props);
}

export async function unmount(props\${ts ? ': any' : ''}) {
  console.info('[\${project_name}]: unmount ', props);
  const { container } = props || {};
  unmountComponentAtNode(container ? container.querySelector('#root') : document.getElementById('root') as HTMLElement);
}

if (!\${ts ? '(window as any)' : 'window'}.__POWERED_BY_QIANKUN__) {
  bootstrap().then(mount);
}\` : \`let container\${ts ? ': null | HTMLElement ' : ''}= null;
document.addEventListener('DOMContentLoaded', function (e) {
  if (!container) {
    container = document.getElementById('root');
    const root = createRoot(container\${ts ? '!)' : ')'};
    root.render(<Router><StrictMode><App /></StrictMode></Router>);
  }
});\` }

\${ !ts ? '/* eslint-disable no-undef */' : '' }
if (module.hot) {
  module.hot.accept();
}
\${ !ts ? '/* eslint-enable no-undef */' : '' }
\``;

export const tpl_src_index = {
  tpl
};

export default tplEngineInit(tpl_src_index, 'tpl');