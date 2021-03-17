import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@pages/home';
\${ts ? \`/* import types */
import type { RouteRecordRaw } from 'vue-router';
\` : ''}
const routes\${ts ? ': Array<RouteRecordRaw>' : ''} = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@pages/detail'),
    children: [
      {
        path: ':id',
        component: () => import('@components/Detail')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
\``;

export const tpl_src_routes = {
  tpl
};

export default tplEngineInit(tpl_src_routes, 'tpl');