import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import '@storybook/addon-notes/register';
import 'storybook-readme/register';
import '@storybook/addon-options/register';
\``;

export const tpl_storybook_addons = {
  tpl
};

export default tpl_engine_init(tpl_storybook_addons, 'tpl');