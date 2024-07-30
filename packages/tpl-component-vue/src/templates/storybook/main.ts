import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import path from 'path';
import vuePlugin from '@vitejs/plugin-vue';
import jsxPlugin from '@vitejs/plugin-vue-jsx';

import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-console",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-knobs",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-viewport"
  ],
  framework: {
    "name": "@storybook/vue3-vite",
    "options": {}
  },
  viteFinal: config => {
    if (!config.resolve) config.resolve = {};
    config.resolve.alias = {
      ...config.resolve?.alias,
      '@': path.resolve(__dirname, '../src')
    };
    config.plugins?.push(vuePlugin(), jsxPlugin());
    return config;
  }
};
export default config;
\``;

export const tpl_storybook_main = {
  tpl
};

export default tplEngineInit(tpl_storybook_main, 'tpl');
