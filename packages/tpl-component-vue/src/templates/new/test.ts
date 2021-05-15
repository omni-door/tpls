import { tplEngineNew } from '@omni-door/utils';

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

export const tpl_new_test = {
  tpl
};

export default tplEngineNew(tpl_new_test, 'tpl');

