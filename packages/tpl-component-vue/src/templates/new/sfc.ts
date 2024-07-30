import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`<template>
  <div :class="classes()">
    <slot name="default">{{ label }}</slot>
  </div>
</template>

<script\${ts ? \` lang="ts"\` : ''}>
import {
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
  setup(props) {
    const classes = classnames(props.prefixCls);
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