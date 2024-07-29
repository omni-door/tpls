import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import * as React from 'react';
import { \${componentName} } from './index';
\${style ? "import '../style';" : ''}
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof \${componentName}> = {
  component: \${componentName},
};
 
export default meta;

type Story = StoryObj<typeof \${componentName}>;
 
export const Primary: Story = {
  render: () => <\${componentName}>Hello \${componentName}</\${componentName}>
};
\``;

export const tpl_new_story = {
  tpl
};

export default tplEngineNew(tpl_new_story, 'tpl');