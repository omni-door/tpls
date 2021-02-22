import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import \${pageName} from './\${pageName}';

export { \${pageName} } from './\${pageName}';
export default \${pageName};
\``;

export const tpl_src_page_index = {
  tpl
};

export default tplEngineInit(tpl_src_page_index, 'tpl');