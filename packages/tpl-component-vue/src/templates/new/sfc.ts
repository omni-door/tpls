import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`<template>
  <div :class="classes(void 0, className)">
    <slot name="default" />
  </div>
</template>

<script\${ts ? \` lang="ts"\` : ''}>
import Vue from 'vue';
import classnames from '@utils/classnames';

export const \${componentName} = Vue.extend({
  name: '\${componentName}',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  methods: {
    classes: classnames('\${componentName.toLowerCase()}')
  }
});

export default \${componentName};
</script>\``;

export const tpl_new_component_sfc = {
  tpl
};

export default tplEngineNew(tpl_new_component_sfc, 'tpl');