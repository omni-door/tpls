import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`<template>
  <div class="\${componentName}">
    {{ \\\`The params is：\\\${$route?.params?.id}\\\` }}
  </div>
</template>

<script \${ts ? 'lang="ts"' : ''}>
import { defineComponent } from 'vue';

export default defineComponent({
  name: '\${componentName}'
});
</script>
\${style ? \`
<style lang="\${style === 'all' ? 'scss' : style}">
@import './style/\${componentName}.\${style === 'all' ? 'scss' : style}';
</style>\` : ''}\``;

export const tpl_src_component_cp = {
  tpl
};

export default tplEngineInit(tpl_src_component_cp, 'tpl');