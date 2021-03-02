import { tplEngineInit } from '@omni-door/utils';
import script_test from './script_test';
import script_commitlint from './script_commitlint';
import script_lint from './script_lint';
import script_lint_es from './script_lint_es';
import script_lint_prettier from './script_lint_prettier';
import script_lint_style from './script_lint_style';
import field_commitlint from './field_commitlint';
import field_eslint from './field_eslint';
import field_prettier from './field_prettier';
import field_stylelint from './field_stylelint';
import commitlint from './commitlint';

const tpl = 
`\`{
  "name": "\${project_name.toLowerCase()}",
  "version": "0.0.1",
  "description": "",
  "scripts": {
    "start": "omni dev",
    "dev": "omni dev",
    \${alter('test', 'script_test')}
    \${include('script_lint')}
    \${alter('eslint', 'script_lint_es')}
    \${alter('prettier', 'script_lint_prettier')}
    \${alter('stylelint', 'script_lint_style')}
    \${alter('commitlint', 'script_commitlint')}
    "new": "omni new",
    "build": "omni build",
    "release": "omni release"
  },
  \${alter('commitlint', 'commitlint')}
  "keywords": [],
  "author": "",
  \${!install ? dependencies : ''}
  \${!install ? devDependencies : ''}
  \${alter('eslint', 'field_eslint')}
  \${alter('prettier', 'field_prettier')}
  \${alter('stylelint', 'field_stylelint')}
  \${alter('commitlint', 'field_commitlint')}
  "omni": {
    "filePath": "./configs/omni.config.js"
  },
  "license": "ISC"
}
\``;

export const tpl_package = {
  tpl,
  script_test,
  script_commitlint,
  script_lint,
  script_lint_es,
  script_lint_prettier,
  script_lint_style,
  field_commitlint,
  field_eslint,
  field_prettier,
  field_stylelint,
  commitlint
};

export default tplEngineInit(tpl_package, 'tpl', {
  script_eslint: 'npm run lint:es',
  script_stylelint: 'npm run lint:style',
  script_prettier: 'npm run lint:prettier',
  script_eslint_fix: 'npm run lint:es_fix',
  script_stylelint_fix: 'npm run lint:style_fix',
  script_prettier_fix: 'npm run lint:prettier_fix'
});