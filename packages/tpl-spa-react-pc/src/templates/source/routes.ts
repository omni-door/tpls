import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import { lazy, Suspense } from 'react';
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
  // Whether this is the default child route.
  index?: boolean;
  // Route path.
  path: string;
  // Component rendered for the route.
  element: LazyExoticComponent<ComponentType<any>> | NamedExoticComponent<any>;
  // Fallback component for lazy loading.
  fallback?: NonNullable<ReactNode> | null;
  // Nested routes.
  children?: IRoute[];
  // Redirect path.
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