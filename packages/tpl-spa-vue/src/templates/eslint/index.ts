import { tplEngineInit } from '@omni-door/utils';
import extends_typescript from './extends_typescript';
import extends_prettier from './extends_prettier';
import parser_typescript from './parser_typescript';
import plugins_typescript from './plugins_typescript';
import plugins_prettier from './plugins_prettier';
import rules_typescript from './rules_typescript';
import rules_typescript_false from './rules_typescript_false';
import rules_prettier from './rules_prettier';

const tpl = 
`\`\${use_strict}

module.exports = {
  env: {
    'browser': true,
    'es6': true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'\${alter('ts', 'extends_typescript')}\${alter('prettier', 'extends_prettier')}
  ],
  globals: {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    \${alter('ts', 'parser_typescript')}
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'vue'\${alter('ts', 'plugins_typescript')}\${alter('prettier', 'plugins_prettier')}
  ],
  rules: {
    'vue/html-indent': ['warn', 2],
    'vue/html-self-closing': ['warn', {
      'html': {
        'void': 'never',
        'normal': 'always',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }],
    'vue/html-quotes': ['warn', 'double', { 'avoidEscape': true }],
    'vue/singleline-html-element-content-newline': ['off'],
    \${alter('ts', 'rules_typescript')}\${alter('ts', 'rules_typescript_false', false)}
    'no-console': ['error', { 'allow': ['warn', 'error', 'info'] }],
    'semi': ['error', 'always'],
    'prefer-spread': ['warn'],
    'no-unused-vars': ['off'],
    'no-extra-semi': ['warn'],
    'quotes': ['error', 'single'],
    'linebreak-style': ['warn', 'unix']\${alter('prettier', 'rules_prettier')}
  }
};
\``;

export const tpl_eslint = {
  tpl,
  extends_typescript,
  extends_prettier,
  parser_typescript,
  plugins_typescript,
  plugins_prettier,
  rules_typescript,
  rules_typescript_false,
  rules_prettier
};

export default tplEngineInit(tpl_eslint, 'tpl');