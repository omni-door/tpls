import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`<script>
var title = '\${project_name}';
document.title = title;
var observer = new MutationObserver(function(mutations) {
  if (document.title.match(/Storybook$/) && title !== document.title) {
    document.title = title;
  }
}).observe(document.querySelector('title'), {
  childList: true,
  subtree: true,
  characterData: true
});
</script>
\``;

export const tpl_storybook_mhead = {
  tpl
};

export default tplEngineInit(tpl_storybook_mhead, 'tpl');