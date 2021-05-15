import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`<template>
  <div class="\${componentName}">
    {{ msg }}
  </div>
</template>

<script \${ts ? 'lang="ts"' : ''}>
export default {
  props: {
    msg: {
      type: String,
      default: ''
    }
  }
};
</script>

\${style ? \`<style lang="\${style === 'all' ? 'scss' : style}">
@import './style/\${componentName}.\${style === 'all' ? 'scss' : style}';
</style>\` : ''}
\``;

export const tpl_new_component = {
  tpl
};

export default tplEngineNew(tpl_new_component, 'tpl');