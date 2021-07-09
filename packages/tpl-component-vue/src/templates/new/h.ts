import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import {
  defineComponent,
  onMounted
} from '@vue/composition-api';
import classnames from '@utils/classnames';
\${ts ? \`/* import types */
import type { CreateElement, VNode } from 'vue';
\` : ''}
export default defineComponent({
  name: '\${componentName}',
  props: {
    prefixCls: {
      type: String,
      default: '\${componentName.toLowerCase()}'
    }
  },
  setup(props) {
    const classes = classnames(props.prefixCls);
    onMounted(() => {
      console.info('\${componentName} mounted!');
    });

    return { classes };
  },
  render(h: CreateElement): VNode {
    const content = this.$slots.default;
    return (
      <div class={this.classes()}>
        { content }
      </div>
    );
  }
});\``;

export const tpl_new_component_h = {
  tpl
};

export default tplEngineNew(tpl_new_component_h, 'tpl');