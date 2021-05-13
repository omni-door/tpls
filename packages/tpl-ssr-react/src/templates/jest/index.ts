import { tplEngineInit } from '@omni-door/utils';

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
    "<rootDir>/../src"
  ],

  testRegex: "(test|__test__)/.*.test.(tsx|ts|jsx|js)?$",

  transform: {
    \${ts ? \`"^.+.(tsx|ts)?$": "ts-jest"\` : \`"^.+.(jsx|js)?$": "babel-jest"\` }
  },

  moduleNameMapper: {
    "^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  }
};
\``;

export const tpl_jest = {
  tpl
};

export default tplEngineInit(tpl_jest, 'tpl');