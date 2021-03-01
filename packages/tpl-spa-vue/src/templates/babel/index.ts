import { tplEngineInit } from '@omni-door/utils';

  const tpl = 
  `\`\${use_strict}

  \``;

  export const tpl_babel = {
    tpl
  };

  export default tplEngineInit(tpl_babel, 'tpl');
