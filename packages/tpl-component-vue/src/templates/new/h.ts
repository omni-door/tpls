import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import {
  defineComponent,
  onMounted
} from 'vue';
import classnames from '@/utils/classnames';

export default defineComponent({
  name: '\${componentName}',
  props: {
    label: {
      type: String,
      default: 'Hello \${componentName}'
    },
    prefixCls: {
      type: String,
      default: '\${componentName.toLowerCase()}'
    }
  },
  setup(props, { slots }) {
    const { label, prefixCls } = props;
    const classes = classnames(prefixCls);
    onMounted(() => {
      console.info('\${componentName} mounted!');
    });

    return () => (
      <div class={classes()}>
        {slots.default ? slots.default() : label}
      </div>
    );
  },
});\``;

export const tpl_new_component_h = {
  tpl
};

export default tplEngineNew(tpl_new_component_h, 'tpl');