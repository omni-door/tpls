import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`\${ts ? "///<reference types='webpack-env' />" : ''}
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
\${style ? \`import styles from './index.\${style === 'all' ? 'scss' : style}';
import './reset.\${style === 'all' ? 'scss' : style}';\` : ''}

const App = () => (
  <div className={\${style ? 'styles.main' : "'main'"}}>
    It's Your Omni-SPA Project
    <span className={\${style ? "styles['main-subtitle']" : "'main-subtitle'"}}>
      start your show
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