import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`# \${componentName}

## Example

\\\`\\\`\\\`vue
<template>
  <\${componentName}>
    {{ 'Hello \${componentName}' }}
  </\${componentName}>
</template>

<script\${ts ? ' lang="ts"' : ''}>
  import { Component, Vue } from 'vue-property-decorator';
  import { \${componentName} } from './\${componentName}';

  @Component(
    components: {
      \${componentName}
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
\\\`\\\`\\\`
\``;

export const tpl_new_readme = {
  tpl
};

export default tplEngineNew(tpl_new_readme, 'tpl');
