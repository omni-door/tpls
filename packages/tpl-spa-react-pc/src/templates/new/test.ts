import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import 'jsdom-global/register';
import * as React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import sinon from 'sinon';
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

export default tplEngineNew(tpl_new_test, 'tpl');

