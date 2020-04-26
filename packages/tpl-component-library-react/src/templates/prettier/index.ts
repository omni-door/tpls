import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

module.exports = {
  tabWidth: 2,
  printWidth: 50,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  endOfLine: 'auto',
  arrowParens: 'avoid',
  rangeEnd: 0
};
\``;

export const tpl_prettier = {
  tpl
};

export default tpl_engine_init(tpl_prettier, 'tpl');