import babel, { tpl_babel } from './babel';
import commitlint, { tpl_commitlint } from './commitlint';
import editor, { tpl_editor } from './editor';
import eslint, { tpl_eslint } from './eslint';
import gulpfile, { tpl_gulpfile } from './gulpfile';
import eslintignore, { tpl_ignore_eslint } from './ignore/eslintignore';
import gitignore, { tpl_ignore_git } from './ignore/gitignore';
import npmignore, { tpl_ignore_npm } from './ignore/npmignore';
import prettierignore, { tpl_ignore_prettier } from './ignore/prettierignore';
import jest, { tpl_jest } from './jest';
import jest_setup, { tpl_jest_setup } from './jest/setup';
import omni, { tpl_omni } from './omni';
import pkj, { tpl_package } from './package';
import prettier, { tpl_prettier } from './prettier';
import readme, { tpl_readme } from './readme';
import readme_cn, { tpl_readme_cn } from './readme/index.zh-CN';
import readme_dev, { tpl_readme_dev } from './readme/dev';
import readme_dev_cn, { tpl_readme_dev_cn } from './readme/dev.zh-CN';
import tsconfig, { tpl_tsconfig } from './tsconfig';
import vscode, { tpl_vscode_setting } from './vsc';
import stylelint, { tpl_stylelint } from './stylelint';
import source_index, { tpl_src_index } from './source/index';
import source_classnames, { tpl_src_classnames } from './source/classnames';
import source_d, { tpl_src_declaration } from './source/declaration';
import source_stories, { tpl_src_stories } from './source/stories';
import public_github_svg, { tpl_public_github_svg } from './public/github-svg';
import storybook_main, { tpl_storybook_main } from './storybook/main';
import storybook_preview, { tpl_storybook_preview } from './storybook/preview';
import storybook_manager, { tpl_storybook_manager } from './storybook/manager';
import storybook_theme, { tpl_storybook_theme } from './storybook/theme';
import component_class, { tpl_new_class } from './new/class_component';
import component_functional, { tpl_new_functional } from './new/functional_component';
import component_index, { tpl_new_index } from './new/index';
import component_interface, { tpl_new_interface } from './new/interface';
import component_readme, { tpl_new_readme } from './new/readme';
import component_style, { tpl_new_style } from './new/style';
import component_stylesheet, { tpl_new_stylesheet } from './new/stylesheet';
import component_test, { tpl_new_test } from './new/test';
import component_stories, { tpl_new_story } from './new/stories';
import husky_commit_msg, { tpl_husky_commit_msg } from './husky/commit-msg';
import husky_pre_commit, { tpl_husky_pre_commit } from './husky/pre-commit';
import husky_pre_push, { tpl_husky_pre_push } from './husky/pre-push';

export { default as babel, tpl_babel } from './babel';
export { default as commitlint, tpl_commitlint } from './commitlint';
export { default as editor, tpl_editor } from './editor';
export { default as eslint, tpl_eslint } from './eslint';
export { default as gulpfile, tpl_gulpfile } from './gulpfile';
export { default as eslintignore, tpl_ignore_eslint } from './ignore/eslintignore';
export { default as gitignore, tpl_ignore_git } from './ignore/gitignore';
export { default as npmignore, tpl_ignore_npm } from './ignore/npmignore';
export { default as prettierignore, tpl_ignore_prettier } from './ignore/prettierignore';
export { default as jest, tpl_jest } from './jest';
export { default as jest_setup, tpl_jest_setup } from './jest/setup';
export { default as omni, tpl_omni } from './omni';
export { default as pkj, tpl_package } from './package';
export { default as prettier, tpl_prettier } from './prettier';
export { default as readme, tpl_readme } from './readme';
export { default as readme_cn, tpl_readme_cn } from './readme/index.zh-CN';
export { default as readme_dev, tpl_readme_dev } from './readme/dev';
export { default as readme_dev_cn, tpl_readme_dev_cn } from './readme/dev.zh-CN';
export { default as tsconfig, tpl_tsconfig } from './tsconfig';
export { default as vscode, tpl_vscode_setting } from './vsc';
export { default as stylelint, tpl_stylelint } from './stylelint';
export { default as source_index, tpl_src_index } from './source/index';
export { default as source_classnames, tpl_src_classnames } from './source/classnames';
export { default as source_d, tpl_src_declaration } from './source/declaration';
export { default as source_stories, tpl_src_stories } from './source/stories';
export { default as public_github_svg, tpl_public_github_svg } from './public/github-svg';
export { default as storybook_preview, tpl_storybook_preview } from './storybook/preview';
export { default as storybook_main, tpl_storybook_main } from './storybook/main';
export { default as storybook_manager, tpl_storybook_manager } from './storybook/manager';
export { default as storybook_theme, tpl_storybook_theme } from './storybook/theme';
export { default as component_class, tpl_new_class } from './new/class_component';
export { default as component_functional, tpl_new_functional } from './new/functional_component';
export { default as component_index, tpl_new_index } from './new/index';
export { default as component_interface, tpl_new_interface } from './new/interface';
export { default as component_readme, tpl_new_readme } from './new/readme';
export { default as component_style, tpl_new_style } from './new/style';
export { default as component_stylesheet, tpl_new_stylesheet } from './new/stylesheet';
export { default as component_test, tpl_new_test } from './new/test';
export { default as component_stories, tpl_new_story } from './new/stories';
export { default as husky_commit_msg, tpl_husky_commit_msg } from './husky/commit-msg';
export { default as husky_pre_commit, tpl_husky_pre_commit } from './husky/pre-commit';
export { default as husky_pre_push, tpl_husky_pre_push } from './husky/pre-push';

/* -- templates - init --  */
export const tpls_init = {
  babel,
  commitlint,
  editor,
  eslint,
  gulpfile,
  eslintignore,
  gitignore,
  jest,
  jest_setup,
  npmignore,
  prettierignore,
  omni,
  pkj,
  prettier,
  readme,
  readme_cn,
  readme_dev,
  readme_dev_cn,
  stylelint,
  tsconfig,
  vscode,
  source_index,
  source_classnames,
  source_d,
  source_stories,
  public_github_svg,
  storybook_preview,
  storybook_main,
  storybook_manager,
  storybook_theme,
  husky_commit_msg,
  husky_pre_commit,
  husky_pre_push
};

export const tpls_origin_init = {
  tpl_babel,
  tpl_commitlint,
  tpl_editor,
  tpl_eslint,
  tpl_gulpfile,
  tpl_ignore_eslint,
  tpl_ignore_git,
  tpl_ignore_npm,
  tpl_ignore_prettier,
  tpl_jest,
  tpl_jest_setup,
  tpl_omni,
  tpl_package,
  tpl_prettier,
  tpl_readme,
  tpl_readme_dev,
  tpl_readme_cn,
  tpl_readme_dev_cn,
  tpl_src_declaration,
  tpl_src_classnames,
  tpl_src_index,
  tpl_src_stories,
  tpl_public_github_svg,
  tpl_storybook_preview,
  tpl_storybook_main,
  tpl_storybook_manager,
  tpl_storybook_theme,
  tpl_stylelint,
  tpl_tsconfig,
  tpl_vscode_setting,
  tpl_husky_commit_msg,
  tpl_husky_pre_commit,
  tpl_husky_pre_push
};

export type TPLS_INITIAL = {
  [T in keyof typeof tpls_init]: typeof tpls_init[T];
};

export type TPLS_ORIGIN_INITIAL = {
  [T in keyof typeof tpls_origin_init]: typeof tpls_origin_init[T];
};

export type TPLS_INITIAL_FN = TPLS_INITIAL[keyof TPLS_INITIAL];

export type TPLS_INITIAL_RETURE = Partial<TPLS_INITIAL>;

/* -- templates - new --  */
export const tpls_new = {
  component_class,
  component_functional,
  component_index,
  component_interface,
  component_readme,
  component_style,
  component_stylesheet,
  component_test,
  component_stories
};

export const tpls_origin_new = {
  tpl_new_class,
  tpl_new_functional,
  tpl_new_index,
  tpl_new_interface,
  tpl_new_readme,
  tpl_new_story,
  tpl_new_style,
  tpl_new_stylesheet,
  tpl_new_test
};

export type TPLS_NEW = {
  [T in keyof typeof tpls_new]: typeof tpls_new[T];
};

export type TPLS_ORIGIN_NEW = {
  [T in keyof typeof tpls_origin_new]: typeof tpls_origin_new[T];
};

export type TPLS_NEW_FN = TPLS_NEW[keyof TPLS_NEW];

export type TPLS_NEW_RETURE = Partial<TPLS_NEW>;

export default {
  ...tpls_init,
  ...tpls_new
};