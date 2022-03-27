import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${ts ? "///<reference types='webpack-env' />" : ''}
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { useLayoutEffect, useState } from 'react';
import { render\${ qiankun ? ', unmountComponentAtNode' : '' } } from 'react-dom';
import { HashRouter as Router, Switch, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import routes, { RouteWithSubRoutes } from './routes';
\${style ? \`import styles from './index.\${style === 'all' ? 'scss' : style}';
import './reset.\${style === 'all' ? 'scss' : style}';\` : ''}

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


  return (
    <Sider className={\${style ? 'styles.sider' : "'sider'"}} theme='light'>
      <Menu
        selectedKeys={selectedKeys}
        openKeys={openedKeys}
        mode='inline'
        onClick={e => setSelectedKeys([e.key\${ts ? ' as string': ''}])}
        onOpenChange={currOpenKeys => setOpenedKeys([...currOpenKeys\${ts ? ' as string[]': ''}])}
      >
        <Menu.Item key='/'>
          <Link to='/'>
            首页
          </Link>
        </Menu.Item>
        <Menu.SubMenu key='/detail' title='详情页'>
          <Menu.Item key='/detail'>
            <Link to='/detail'>
              详情主页
            </Link>
          </Menu.Item>
          <Menu.Item key='/detail/2'>
            <Link to='/detail/2'>
              详情二
            </Link>
          </Menu.Item>
          <Menu.Item key='/detail/6'>
            <Link to='/detail/6'>
              详情六
            </Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};

const App = () => {
  return (
    <Layout>
      <SiderMenu />
      <Layout className={\${style ? 'styles.main' : "'main'"}}>
        <Header className={\${style ? "styles['main-header']" : "'main-header'"}}>
          头部导航栏
        </Header>
        <Content className={\${style ? "styles['main-content']" : "'main-content'"}}>
          <Switch>
            {
              routes.map((route, i) => <RouteWithSubRoutes key={i} { ...route } />)
            }
          </Switch>
        </Content>
        <Footer className={\${style ? "styles['main-footer']" : "'main-footer'"}}>
          ©omni-door
        </Footer>
      </Layout>
    </Layout>
  );
};

\${ qiankun ? \`function renderApp (container\${ts ? ': Element | DocumentFragment | null' : ''}, props\${ts ? ': any' : ''}) {
  render(<Router><App { ...props } /></Router>, container);
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
}\` : "render(<Router><App /></Router>, document.getElementById('root'));" }

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