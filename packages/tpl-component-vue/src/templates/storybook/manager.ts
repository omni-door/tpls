import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import { addons } from '@storybook/manager-api';
import theme from './theme';

addons.setConfig({
  theme,
});
\``;

export const tpl_storybook_manager = {
  tpl
};

export default tplEngineInit(tpl_storybook_manager, 'tpl');