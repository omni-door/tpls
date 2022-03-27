import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import React, { lazy, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from './pages/home';
\${ts ? \`/* import types */
import type {
  ReactNode,
  LazyExoticComponent,
  ComponentType,
  NamedExoticComponent
} from 'react';
\` : ''}
export const RouteWithSubRoutes = (route\${ts ? ': IRoute' : ''}) => {
  const _Route = () => <Route
    path={route.path}
    exact={route.exact}
    render={props => {
      return route.redirect
        ? <Redirect to={route.redirect} />
        : <route.component { ...props } routes={route.routes} />; 
    }}
  />;
  return (
    route.fallback
      ? <Suspense fallback={route.fallback}>
        <_Route />
      </Suspense>
      : <_Route />
  );
};
\${ts ? \`
export interface IRoute {
  // 路由路径
  path: string | string[];
  // 路由对应的组件
  component: LazyExoticComponent<ComponentType<any>> | NamedExoticComponent<any>;
  // 是否精确匹配
  exact?: boolean;
  // 启用懒加载的fallback
  fallback?: NonNullable<ReactNode> | null;
  // 嵌套路由
  routes?: IRoute[];
  // 重定向路径
  redirect?: string;
}
\` : ''}
const routes\${ts ? ': IRoute[]' : ''} = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/detail',
    component: lazy(() => import('@pages/detail')),
    fallback: <div> Loading Detail Page... </div>,
    routes: [
      {
        path: '/detail/:id',
        component: lazy(() => import('@components/Detail')),
        exact: false,
        fallback: <div> Loading Detail Component... </div>
      }
    ]
  }
];

export default routes;
\``;

export const tpl_src_routes = {
  tpl
};

export default tplEngineInit(tpl_src_routes, 'tpl');