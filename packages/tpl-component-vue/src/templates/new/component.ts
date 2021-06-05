import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator';
import classnames from '@utils/classnames';
\${ts ? \`/* import types */
import type { CreateElement, VNode } from 'vue';
\` : ''}
@Component
export class \${componentName} extends Vue {
  @Prop({ type: String, default: '' }) private className!: string;

  public render(h\${ts ? \`: CreateElement): VNode\` : ')'} {
    const content = this.$slots.default;
    const classes = classnames('\${componentName.toLowerCase()}');
    return h(
      'div',
      {
        staticClass: classes(),
        class: this.className
      },
      content
    );
  }
}

export default \${componentName};\``;

export const tpl_new_component = {
  tpl
};

export default tplEngineNew(tpl_new_component, 'tpl');