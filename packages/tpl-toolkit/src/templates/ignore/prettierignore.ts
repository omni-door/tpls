import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`src/.umi
**/__test__/
\``;

export const tpl_ignore_prettier = {
  tpl 
};

export default tplEngineInit(tpl_ignore_prettier, 'tpl');

