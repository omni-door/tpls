import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import \${componentName} from '.';
import './style';

import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof \${componentName}> = {
  title: 'Components/\${componentName}',
  component: \${componentName},
  // https://storybook.js.org/docs/api/arg-types#controltype
  argTypes: {
    label: { control: 'text' },
    prefixCls: { control: 'text' },
  },
  args: {
    label: 'Hello \${componentName}',
    prefixCls: '\${componentName.toLowerCase()}',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof \${componentName}>;

export const Primary: Story = {
  args: {
    prefixCls: '\${componentName.toLowerCase()}',
  },
};
\``;

export const tpl_new_story = {
  tpl
};

export default tplEngineNew(tpl_new_story, 'tpl');