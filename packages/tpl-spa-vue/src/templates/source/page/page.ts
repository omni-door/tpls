import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`<template>
  <div class="\${pageName}">\${content}</div>
</template>

<script \${ts ? 'lang="ts"' : ''}>
import { defineComponent } from 'vue';

export default defineComponent({
  name: '\${pageName}'
});
</script>

<style lang="\${style === 'all' ? 'scss' : style}">
@import './style/home.\${style === 'all' ? 'scss' : style}';
</style>
\``;

export const tpl_src_page_page = {
  tpl
};

export default tplEngineInit(tpl_src_page_page, 'tpl');