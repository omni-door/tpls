import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`\${ts ? "///<reference types='webpack-env' />" : ''}
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Switch, Link } from 'react-router-dom';
import routes, { RouteWithSubRoutes } from './routes';
\${style ? \`import styles from './index.\${style === 'all' ? 'scss' : style}';
import './reset.\${style === 'all' ? 'scss' : style}';\` : ''}

const App = () => (
  <div className={\${style ? 'styles.main' : "'main'"}}>
    <Switch>
      {
        routes.map((route, i) => <RouteWithSubRoutes key={i} { ...route } />)
      }
    </Switch>
    <span className={\${style ? "[styles['main-btn'], styles['main-btn-home']].join(' ')" : "'main-btn main-btn-home'"}}>
      <Link to='/'>
        Home
      </Link>
    </span>
    <span className={\${style ? "[styles['main-btn'], styles['main-btn-detail']].join(' ')" : "'main-btn main-btn-detail'"}}>
      <Link to='/detail'>
        Detail
      </Link>
    </span>
    <span className={\${style ? "[styles['main-btn'], styles['main-btn-detail-1']].join(' ')" : "'main-btn main-btn-detail-1'"}}>
      <Link to='/detail/1'>
        Detail - Part1
      </Link>
    </span>
    <span className={\${style ? "[styles['main-btn'], styles['main-btn-detail-2']].join(' ')" : "'main-btn main-btn-detail-2'"}}>
      <Link to='/detail/2'>
        Detail - Part2
      </Link>
    </span>
    <footer className={\${style ? "styles['main-footer']" : "'main-footer'"}}>
      OMNI-DOOR TEAM @omni-door
    </footer>
  </div>
);

render(<App />, document.getElementById('root'));

\${ !ts ? '/* eslint-disable no-undef */' : '' }
if (module.hot) {
  module.hot.accept();
}
\${ !ts ? '/* eslint-enable no-undef */' : '' }
\``;

export const tpl_src_index = {
  tpl
};

export default tpl_engine_init(tpl_src_index, 'tpl');