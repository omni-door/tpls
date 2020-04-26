import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`import { addDecorator, configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { addReadme } from 'storybook-readme';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo);
addDecorator(addReadme);
setOptions({
  name: '\${project_name}',
});

const req = require.context('../src/', true, /\.stories\.(tsx|jsx)$/);
function loadStories() {
  const keys = req.keys();
  keys.forEach(filename => req(filename));
};
configure(loadStories, module);
\``;

export const tpl_storybook_config = {
  tpl
};

export default tpl_engine_init(tpl_storybook_config, 'tpl');
