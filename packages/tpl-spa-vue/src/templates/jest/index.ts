import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}
const path = require('path');

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
    \${ts ? \`"^.+.ts$": "ts-jest",\` : \`"^.+.js$": ["babel-jest", { configFile: path.resolve(__dirname, "babel.config.js") }],\` }
    "^.+.vue$": "vue-jest"
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  }
};
\``;

export const tpl_jest = {
  tpl
};

export default tplEngineInit(tpl_jest, 'tpl');