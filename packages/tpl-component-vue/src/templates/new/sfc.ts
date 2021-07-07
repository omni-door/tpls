import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`<template>
  <div :class="classes(void 0, className)">
    <slot name="default" />
  </div>
</template>

<script\${ts ? \` lang="ts"\` : ''}>
import {
  defineComponent,
  onMounted
} from '@vue/composition-api';
import classnames from '@utils/classnames';

export default defineComponent({
  name: '\${componentName}',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  setup() {
    const classes = classnames('\${componentName.toLowerCase()}');
    onMounted(() => {
      console.info('\${componentName} mounted!');
    });

    return { classes };
  }
});
</script>\``;

export const tpl_new_component_sfc = {
  tpl
};

export default tplEngineNew(tpl_new_component_sfc, 'tpl');