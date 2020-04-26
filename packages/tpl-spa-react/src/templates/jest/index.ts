import { tpl_engine_init } from '@omni-door/utils';
import ts_jest from './ts_jest';

const tpl = 
`\`\${use_strict}

module.exports = {
  clearMocks: true,

  coverageDirectory: "coverage",

  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node"
  ],

  roots: [
    "<rootDir>/src"
  ],

  testRegex: "(test|__test__)/.*.test.(tsx|ts|jsx|js)?$",

  \${alter('ts', 'ts_jest')}

  moduleNameMapper: {
    "^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  }
};
\``;

export const tpl_jest = {
  tpl,
  ts_jest
};

export default tpl_engine_init(tpl_jest, 'tpl');