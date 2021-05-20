import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import '@storybook/addon-notes/register';
import 'storybook-readme/register';
import '@storybook/addon-options/register';
import '@storybook/addon-viewport/register';
import { addons } from '@storybook/addons';
import theme from './theme';

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'right',
  enableShortcuts: true,
  isToolshown: true,
  initialActive: 'sidebar',
  sidebar: {
    showRoots: false,
    collapsedRoots: ['other']
  },
  theme
});
\``;

export const tpl_storybook_addons = {
  tpl
};

export default tplEngineInit(tpl_storybook_addons, 'tpl');