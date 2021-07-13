import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`.prefix-\${componentName.toLowerCase()} {
  display: block;
  color: blue;
}
\``;

export const tpl_new_stylesheet = {
  tpl
};

export default tplEngineNew(tpl_new_stylesheet, 'tpl');