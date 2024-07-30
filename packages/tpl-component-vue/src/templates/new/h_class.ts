import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import { Component, Vue, Prop } from 'vue-property-decorator';
import classnames from '@/utils/classnames';
\${ts ? \`/* import types */
import type { CreateElement, VNode } from 'vue';
\` : ''}
@Component
export default class \${componentName} extends Vue {
  @Prop({ type: String, default: '\${componentName.toLowerCase()}' }) \${ts ? \`private prefixCls!: string;\` : 'prefixCls;'}

  \${ts ? \`protected render(h: CreateElement): VNode\` : 'render(h)'} {
    const content = this.$slots.default;
    const classes = classnames(this.prefixCls);
    return h(
      'div',
      {
        staticClass: classes()
      },
      content
    );
  }
}\``;

export const tpl_new_component_h_class = {
  tpl
};

export default tplEngineNew(tpl_new_component_h_class, 'tpl');