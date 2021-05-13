import { tplEngineInit } from '@omni-door/utils';
import ts_jest from './ts_jest';

const tpl = 
`\`\${use_strict}

module.exports = {
  clearMocks: true,

  coverageDirectory: "coverage",

  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    "vue"
  ],

  roots: [
    "<rootDir>/../src"
  ],

  testRegex: "(test|__test__)/.*.test.(vue|ts|js)?$",

  transform: {
    \${alter('ts', 'ts_jest')}
    '^.+\\.vue$': 'vue-jest'
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  }
};
\``;

export const tpl_jest = {
  tpl,
  ts_jest
};

export default tplEngineInit(tpl_jest, 'tpl');