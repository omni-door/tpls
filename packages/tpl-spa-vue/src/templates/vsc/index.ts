import { tplEngineInit } from "@omni-door/utils";

const tpl = 
`\`{
  "editor.tabSize": 2,
  "editor.formatOnSave": \${eslint ? false : true},
  "javascript.format.enable": \${eslint ? false : true},
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
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": \${eslint ? true : false}
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

export default tplEngineInit(tpl_vscode_setting, "tpl");
