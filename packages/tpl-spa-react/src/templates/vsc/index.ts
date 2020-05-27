import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`{
  "editor.tabSize": 2,
  "editor.formatOnSave": \${(eslint || prettier) ? false : true},
  "javascript.format.enable": \${(eslint || prettier) ? false : true},
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": \${eslint ? true : false},
    "source.fixAll.prettier": \${prettier ? true : false},
    "source.fixAll.stylelint": \${stylelint ? true : false}
  },
  "files.exclude": {
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

export default tpl_engine_init(tpl_vscode_setting, 'tpl');