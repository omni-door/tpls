import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import { \${componentName} } from '../index';
\${style ? "import '../style';" : ''}

storiesOf('\${componentName}', module)
  .addParameters({
    readme: {
      sidebar: require('../README.md').default,
      highlightSidebar: true,
      codeTheme: 'github'
    },
    options: { theme: themes.light },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6'
    }
  })
  .add('with text', () => <\${componentName}>Hello \${componentName}</\${componentName}>);
\``;

export const tpl_new_story = {
  tpl
};

export default tpl_engine_new(tpl_new_story, 'tpl');