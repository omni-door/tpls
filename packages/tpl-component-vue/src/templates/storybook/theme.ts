import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import { create } from '@storybook/theming/create';

export default create({
  base: 'dark',
  brandTitle: '\${project_name}',
  brandUrl: 'https://github.com/',
  brandImage: './github-mark.svg',
  brandTarget: '_blank',
});
\``;

export const tpl_storybook_theme = {
  tpl
};

export default tplEngineInit(tpl_storybook_theme, 'tpl');