import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { \${componentName} } from '../index';

storiesOf('\${componentName}', module)
  .addParameters({
    readme: {
      sidebar: require('../README.md').default,
      highlightSidebar: true,
      codeTheme: 'github'
    },
  })
  .add('with text', () => <\${componentName}>Hello \${componentName}</\${componentName}>);
\``;

export const tpl_new_story = {
  tpl
};

export default tpl_engine_new(tpl_new_story, 'tpl');