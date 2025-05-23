import babel, { tpl_babel } from './babel';
import commitlint, { tpl_commitlint } from './commitlint';
import editor, { tpl_editor } from './editor';
import eslint, { tpl_eslint } from './eslint';
import eslintignore, { tpl_ignore_eslint } from './ignore/eslintignore';
import gitignore, { tpl_ignore_git } from './ignore/gitignore';
import npmignore, { tpl_ignore_npm } from './ignore/npmignore';
import prettierignore, { tpl_ignore_prettier } from './ignore/prettierignore';
import jest, { tpl_jest } from './jest';
import omni, { tpl_omni } from './omni';
import pkj, { tpl_package } from './package';
import postcss, { tpl_postcss } from './postcss';
import prettier, { tpl_prettier } from './prettier';
import readme, { tpl_readme } from './readme';
import readme_cn, { tpl_readme_cn } from './readme/index.zh-CN';
import source_index_react, { tpl_src_index } from './source/index_react';
import source_html, { tpl_src_html } from './source/html';
import source_routes, { tpl_src_routes } from './source/routes';
import source_d_i, { tpl_src_declaration_index } from './source/declaration_index';
import source_d_g, { tpl_src_declaration_global } from './source/declaration_global';
import source_index_style, { tpl_src_style } from './source/style';
import source_index_reset, { tpl_src_reset } from './source/reset';
import source_page_index, { tpl_src_page_index } from './source/page/index';
import source_page_page, { tpl_src_page_page } from './source/page/page';
import source_page_page_nest, { tpl_src_page_page_nest } from './source/page/page_nest';
import source_page_style, { tpl_src_page_style } from './source/page/style';
import source_component_index, { tpl_src_component_index } from './source/component';
import source_component_cp, { tpl_src_component_cp } from './source/component/component';
import source_component_style, { tpl_src_component_style } from './source/component/style';
import source_component_test, { tpl_src_component_test } from './source/component/test';
import stylelint, { tpl_stylelint } from './stylelint';
import tsconfig, { tpl_tsconfig } from './tsconfig';
import vscode, { tpl_vscode_setting } from './vsc';
import webpack_config_common, { tpl_webpack_common } from './webpack/common';
import webpack_config_dev, { tpl_webpack_dev } from './webpack/dev';
import webpack_config_prod, { tpl_webpack_prod } from './webpack/prod';
import component_class, { tpl_new_class } from './new/component_class';
import component_functional, { tpl_new_functional } from './new/component_functional';
import component_index, { tpl_new_index } from './new/index';
import component_readme, { tpl_new_readme } from './new/readme';
import component_stylesheet, { tpl_new_stylesheet } from './new/stylesheet';
import component_test, { tpl_new_test } from './new/test';
import husky_commit_msg, { tpl_husky_commit_msg } from './husky/commit-msg';
import husky_pre_commit, { tpl_husky_pre_commit } from './husky/pre-commit';
import husky_pre_push, { tpl_husky_pre_push } from './husky/pre-push';

export { default as babel, tpl_babel } from './babel';
export { default as commitlint, tpl_commitlint } from './commitlint';
export { default as editor, tpl_editor } from './editor';
export { default as eslint, tpl_eslint } from './eslint';
export { default as eslintignore, tpl_ignore_eslint } from './ignore/eslintignore';
export { default as gitignore, tpl_ignore_git } from './ignore/gitignore';
export { default as npmignore, tpl_ignore_npm } from './ignore/npmignore';
export { default as prettierignore, tpl_ignore_prettier } from './ignore/prettierignore';
export { default as jest, tpl_jest } from './jest';
export { default as omni, tpl_omni } from './omni';
export { default as pkj, tpl_package } from './package';
export { default as postcss, tpl_postcss } from './postcss';
export { default as prettier, tpl_prettier } from './prettier';
export { default as readme, tpl_readme } from './readme';
export { default as readme_cn, tpl_readme_cn } from './readme/index.zh-CN';
export { default as source_index_react, tpl_src_index } from './source/index_react';
export { default as source_html, tpl_src_html } from './source/html';
export { default as source_routes, tpl_src_routes } from './source/routes';
export { default as source_d_i, tpl_src_declaration_index } from './source/declaration_index';
export { default as source_d_g, tpl_src_declaration_global } from './source/declaration_global';
export { default as source_index_style, tpl_src_style } from './source/style';
export { default as source_index_reset, tpl_src_reset } from './source/reset';
export { default as source_page_index, tpl_src_page_index } from './source/page/index';
export { default as source_page_page, tpl_src_page_page } from './source/page/page';
export { default as source_page_page_nest, tpl_src_page_page_nest } from './source/page/page_nest';
export { default as source_page_style, tpl_src_page_style } from './source/page/style';
export { default as source_component_index, tpl_src_component_index } from './source/component';
export { default as source_component_cp, tpl_src_component_cp } from './source/component/component';
export { default as source_component_style, tpl_src_component_style } from './source/component/style';
export { default as source_component_test, tpl_src_component_test } from './source/component/test';
export { default as stylelint, tpl_stylelint } from './stylelint';
export { default as tsconfig, tpl_tsconfig } from './tsconfig';
export { default as vscode, tpl_vscode_setting } from './vsc';
export { default as webpack_config_common, tpl_webpack_common } from './webpack/common';
export { default as webpack_config_dev, tpl_webpack_dev } from './webpack/dev';
export { default as webpack_config_prod, tpl_webpack_prod } from './webpack/prod';
export { default as component_class, tpl_new_class } from './new/component_class';
export { default as component_functional, tpl_new_functional } from './new/component_functional';
export { default as component_index, tpl_new_index } from './new/index';
export { default as component_readme, tpl_new_readme } from './new/readme';
export { default as component_stylesheet, tpl_new_stylesheet } from './new/stylesheet';
export { default as component_test, tpl_new_test } from './new/test';
export { default as husky_commit_msg, tpl_husky_commit_msg } from './husky/commit-msg';
export { default as husky_pre_commit, tpl_husky_pre_commit } from './husky/pre-commit';
export { default as husky_pre_push, tpl_husky_pre_push } from './husky/pre-push';

/* -- templates - init --  */
export const tpls_init = {
  babel,
  commitlint,
  editor,
  eslint,
  eslintignore,
  gitignore,
  jest,
  npmignore,
  prettierignore,
  omni,
  pkj,
  postcss,
  prettier,
  readme,
  readme_cn,
  stylelint,
  tsconfig,
  vscode,
  source_index_react,
  source_routes,
  source_html,
  source_d_i,
  source_d_g,
  source_index_style,
  source_index_reset,
  source_page_index,
  source_page_page,
  source_page_page_nest,
  source_page_style,
  source_component_index,
  source_component_cp,
  source_component_style,
  source_component_test,
  webpack_config_common,
  webpack_config_dev,
  webpack_config_prod,
  husky_commit_msg,
  husky_pre_commit,
  husky_pre_push
};

export const tpls_origin_init = {
  tpl_babel,
  tpl_commitlint,
  tpl_editor,
  tpl_eslint,
  tpl_ignore_eslint,
  tpl_ignore_git,
  tpl_jest,
  tpl_ignore_npm,
  tpl_ignore_prettier,
  tpl_omni,
  tpl_package,
  tpl_postcss,
  tpl_readme,
  tpl_readme_cn,
  tpl_prettier,
  tpl_stylelint,
  tpl_tsconfig,
  tpl_vscode_setting,
  tpl_src_index,
  tpl_src_html,
  tpl_src_routes,
  tpl_src_declaration_index,
  tpl_src_declaration_global,
  tpl_src_style,
  tpl_src_reset,
  tpl_src_page_index,
  tpl_src_page_page,
  tpl_src_page_page_nest,
  tpl_src_page_style,
  tpl_src_component_index,
  tpl_src_component_cp,
  tpl_src_component_style,
  tpl_src_component_test,
  tpl_webpack_common,
  tpl_webpack_dev,
  tpl_webpack_prod,
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
  component_readme,
  component_stylesheet,
  component_test
};

export const tpls_origin_new = {
  tpl_new_class,
  tpl_new_functional,
  tpl_new_index,
  tpl_new_readme,
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

export default { ...tpls_init, ...tpls_new };