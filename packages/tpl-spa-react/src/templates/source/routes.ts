import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import React, { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Home from './pages/home';
\${ts ? \`/* import types */
import type {
  ReactNode,
  LazyExoticComponent,
  ComponentType,
  NamedExoticComponent,
  PropsWithChildren
} from 'react';
import type { RouteObject } from 'react-router-dom';
\` : ''}
\${ts ? \`
export interface IRoute {
  // 是否默认路由 (default child routes)
  index?: boolean;
  // 路由路径 (The path for route)
  path: string;
  // 路由对应的组件 (The render component for route)
  element: LazyExoticComponent<ComponentType<any>> | NamedExoticComponent<any>;
  // 启用懒加载的fallback (the fallback for lazy load)
  fallback?: NonNullable<ReactNode> | null;
  // 嵌套路由 (nest route)
  children?: IRoute[];
  // 重定向路径 (redirect path)
  redirect?: string;
}
\` : ''}
export const _Element = (route\${ts ? ': IRoute)' : ')'} => {
  const _Suspense = ({ children }\${ts ? ': PropsWithChildren<{}>)' : ')'} => route.fallback
    ? <Suspense fallback={route.fallback}>
      {children}
    </Suspense>
    : <>{children}</>;
  return <_Suspense>
    {
      route.redirect
        ? <Navigate to={route.redirect} replace />
        : <route.element routes={route.children} />
    }
  </_Suspense>;
};

const routes\${ts ? ': IRoute[]' : ''} = [
  {
    path: '/',
    element: Home
  },
  {
    path: '/detail',
    element: lazy(() => import('@pages/detail')),
    fallback: <div> Loading Detail Page... </div>,
    children: [
      {
        path: '/detail/:id',
        element: lazy(() => import('@components/Detail')),
        fallback: <div> Loading Detail Component... </div>
      }
    ]
  }
];

export const Routes = () => {
  const getRoutes = (_routes\${ts ? ': IRoute[]): RouteObject[]' : ')'} => {
    return _routes.map(route => {
      const { path, children } = route;
      const element = <_Element {...route} />;
      return {
        path,
        element,
        children: getRoutes(children || [])
      };
    });
  };
  return useRoutes(getRoutes(routes));
};

export default Routes;
\``;

export const tpl_src_routes = {
  tpl
};

export default tplEngineInit(tpl_src_routes, 'tpl');