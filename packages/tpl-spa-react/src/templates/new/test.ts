import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
`\`import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import \${componentName} from '../index';

configure({ adapter: new Adapter() });

describe('\${componentName}', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <\${componentName} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
\``;

export const tpl_new_test = {
  tpl
};

export default tpl_engine_new(tpl_new_test, 'tpl');

