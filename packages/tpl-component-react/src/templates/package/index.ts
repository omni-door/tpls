import { tplEngineInit, COMPONENT_SERVER } from '@omni-door/utils';
import script_test from './script_test';
import script_commitlint from './script_commitlint';
import script_lint from './script_lint';
import script_lint_es from './script_lint_es';
import script_lint_prettier from './script_lint_prettier';
import script_lint_style from './script_lint_style';
import commitlint from './commitlint';
import resolutions from './resolutions';


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
    "new": "omni new",
    "build": "omni build",
    \${
      demoScript
        ? \`"build:demo": "\${demoScript}",\`
        : ''
    }
    "release": "omni release"
  },
  \${alter('commitlint', 'commitlint')}
  "keywords": [],
  "author": "",
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0",
    "prop-types": ">=15.7.0"
  },
  \${!install ? dependencies : ''}
  \${!install ? devDependencies : ''}
  \${
    (type_react && ts && \`\${alter_strategy({
      stable: 'resolutions'
    })}\`) || ''
  }
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
  commitlint,
  resolutions
};

export default ({
  type_react,
  project_name,
  devServer
}: {
  type_react: string;
  project_name: string;
  devServer: COMPONENT_SERVER;
}) => {
  const devScript = 'storybook dev -p 6200';
  const demoScript = 'storybook build -c .storybook -o dist-story';
  return tplEngineInit(tpl_package, 'tpl', {
    type_react,
    devScript,
    demoScript,
    script_eslint: 'npm run lint:es',
    script_stylelint: 'npm run lint:style',
    script_prettier: 'npm run lint:prettier',
    script_eslint_fix: 'npm run lint:es_fix',
    script_stylelint_fix: 'npm run lint:style_fix',
    script_prettier_fix: 'npm run lint:prettier_fix'
  });
};