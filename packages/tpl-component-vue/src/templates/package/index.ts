import { tplEngineInit } from "@omni-door/utils";
import script_test from './script_test';
import script_commitlint from './script_commitlint';
import script_prepare from './script_prepare';
import script_lint from './script_lint';
import script_lint_es from './script_lint_es';
import script_lint_prettier from './script_lint_prettier';
import script_lint_style from './script_lint_style';
import commitlint from './commitlint';

const tpl = 
`\`{
  "name": "\${project_name.toLowerCase()}",
  "version": "0.0.1",
  "description": "",
  "main": "lib/index.js",
  "module": "es/index.js",
  "typings": "lib/index.d.ts",
  "scripts": {
    "start": "omni dev",
    "dev": "omni dev",
    \${alter('test', 'script_test')}
    \${include('script_lint')}
    \${alter('eslint', 'script_lint_es')}
    \${alter('prettier', 'script_lint_prettier')}
    \${alter('stylelint', 'script_lint_style')}
    \${alter('commitlint', 'script_commitlint')}
    \${alter('commitlint', 'script_prepare')}
    "new": "omni new",
    "build": "omni build",
    "build:demo": "build-storybook -c .storybook -o dist-story",
    "release": "omni release"
  },
  "keywords": [],
  "author": "",
  "peerDependencies": {
    "vue": "3.4.x"
  },
  \${!install ? dependencies : ""}
  \${!install ? devDependencies : ""}
  "license": "ISC"
}
\``;

export const tpl_package = {
  tpl,
  script_test,
  script_commitlint,
  script_prepare,
  script_lint,
  script_lint_es,
  script_lint_prettier,
  script_lint_style,
  commitlint
};

export default tplEngineInit(tpl_package, "tpl", {
  script_eslint: 'npm run lint:es',
  script_stylelint: 'npm run lint:style',
  script_prettier: 'npm run lint:prettier',
  script_eslint_fix: 'npm run lint:es_fix',
  script_stylelint_fix: 'npm run lint:style_fix',
  script_prettier_fix: 'npm run lint:prettier_fix'
});
