import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import { shallowMount, mount } from '@vue/test-utils';
import \${componentName} from '../';

describe('\${componentName}', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(\${componentName});
    expect(wrapper).toMatchSnapshot();
  });
});
\``;

export const tpl_src_component_test = {
  tpl
};

export default tplEngineInit(tpl_src_component_test, 'tpl');

