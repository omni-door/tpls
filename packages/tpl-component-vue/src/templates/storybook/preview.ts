import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import type { Preview } from '@storybook/vue3'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
\``;

export const tpl_storybook_preview = {
  tpl
};

export default tplEngineInit(tpl_storybook_preview, 'tpl');