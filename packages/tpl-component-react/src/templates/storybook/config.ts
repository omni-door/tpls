import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import { addDecorator, configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withConsole } from '@storybook/addon-console';
import { addReadme } from 'storybook-readme';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addDecorator(addReadme);
setOptions({
  name: '\${project_name}'
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

export default tplEngineInit(tpl_storybook_config, 'tpl');
