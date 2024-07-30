import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import * as React from 'react';
import { \${componentName} } from './index';
\${style ? "import './style';" : ''}
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof \${componentName}> = {
  title: 'Components/\${componentName}',
  component: \${componentName},
  // https://storybook.js.org/docs/api/arg-types#controltype
  argTypes: {
    className: { control: 'text' },
    prefixCls: { control: 'text' },
  },
  args: {
    prefixCls: 'button',
  },
  tags: ['autodocs'],
};
 
export default meta;

type Story = StoryObj<typeof \${componentName}>;
 
export const Primary: Story = {
  args: {
    prefixCls: '\${componentName.toLowerCase()}',
    children: 'Hello \${componentName}'
  },
};
\``;

export const tpl_new_story = {
  tpl
};

export default tplEngineNew(tpl_new_story, 'tpl');