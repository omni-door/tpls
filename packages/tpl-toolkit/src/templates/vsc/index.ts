import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`{
  "editor.tabSize": 2,
  "editor.formatOnSave": \${eslint ? false : true},
  "eslint.enable": \${eslint ? true : false},
  "[css]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[less]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[scss]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[sass]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[javascript]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[typescript]": {
    "editor.codeActionsOnSave": {
      "source.fixAll": \${eslint ? true : false},
      "source.fixAll.eslint": \${eslint ? "explicit" : false}
    },
    "editor.formatOnSave": \${eslint ? false : true},
    "editor.formatOnPaste": \${eslint ? false : true}
  },
  "files.exclude": {
    "**/.vscode": true,
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/.editorconfig": true,
    "**/.eslintignore": true,
    "**/.prettierignore": true
  }
}
\``;

export const tpl_vscode_setting = {
  tpl
};

export default tplEngineInit(tpl_vscode_setting, 'tpl');