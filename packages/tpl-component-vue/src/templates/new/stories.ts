import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import { storiesOf } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import \${componentName} from '../';
import '../style';

storiesOf('\${componentName}', module)
  .addParameters({
    readme: {
      \${md ? \`sidebar: require('../README.md').default,\` : ''}
      highlightSidebar: true,
      codeTheme: 'github'
    },
    options: { theme: themes.light },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6'
    }
  })
  .add('basic usage', () => ({
    components: {
      \${componentName}
    },
    template: \\\`<\${componentName}>{{'Hello \${componentName}'}}</\${componentName}>\\\`
  }));
\``;

export const tpl_new_story = {
  tpl
};

export default tplEngineNew(tpl_new_story, 'tpl');