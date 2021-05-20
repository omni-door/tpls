import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import { create } from '@storybook/theming';

export default create({
  base: 'light',
  brandTitle: '\${project_name}',
  // brandUrl: '',
  // brandImage: ''
});
\``;

export const tpl_storybook_theme = {
  tpl
};

export default tplEngineInit(tpl_storybook_theme, 'tpl');
