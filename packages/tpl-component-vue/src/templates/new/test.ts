import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import { shallowMount, mount } from '@vue/test-utils';
import \${componentName} from '../';

Vue.use(VueCompositionAPI);

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

