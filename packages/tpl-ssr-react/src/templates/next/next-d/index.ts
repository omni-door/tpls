import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference types="next/navigation-types/compat/navigation" />
\``;

export const tpl_next_d = {
  tpl
};

export default tplEngineInit(tpl_next_d, 'tpl');