import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { \${componentName} } from '../index';

configure({ adapter: new Adapter() });

describe('\${componentName}', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <\${componentName} \${ts ? \`history={{} as any} location={{} as any} match={{} as any}\` : ''} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
\``;

export const tpl_src_component_test = {
  tpl
};

export default tplEngineInit(tpl_src_component_test, 'tpl');

