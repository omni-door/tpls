import babel, { tpl_babel } from './babel';
import commitlint, { tpl_commitlint } from './commitlint';
import eslint, { tpl_eslint } from './eslint';
import eslintignore, { tpl_ignore_eslint } from './ignore/eslintignore';
import gitignore, { tpl_ignore_git } from './ignore/gitignore';
import npmignore, { tpl_ignore_npm } from './ignore/npmignore';
import prettierignore, { tpl_ignore_prettier } from './ignore/prettierignore';
import jest, { tpl_jest } from './jest';
import omni, { tpl_omni } from './omni';
import pkj, { tpl_package } from './package';
import prettier, { tpl_prettier } from './prettier';
import readme, { tpl_readme } from './readme';
import tsconfig, { tpl_tsconfig } from './tsconfig';
import stylelint, { tpl_stylelint } from './stylelint';
import source_index_react, { tpl_src_index } from './source/index_react';
import source_html, { tpl_src_html } from './source/html';
import source_d, { tpl_src_declaration } from './source/declaration';
import source_index_style, { tpl_src_style } from './source/style';
import source_index_reset, { tpl_src_reset } from './source/reset';
import webpack_config_common, { tpl_webpack_common } from './webpack/common';
import webpack_config_dev, { tpl_webpack_dev } from './webpack/dev';
import webpack_config_prod, { tpl_webpack_prod } from './webpack/prod';
import component_class, { tpl_new_class } from './new/component_class';
import component_functional, { tpl_new_functional } from './new/component_functional';
import component_index, { tpl_new_index } from './new/index';
import component_readme, { tpl_new_readme } from './new/readme';
import component_stylesheet, { tpl_new_stylesheet } from './new/stylesheet';
import component_test, { tpl_new_test } from './new/test';

export { default as babel, tpl_babel } from './babel';
export { default as commitlint, tpl_commitlint } from './commitlint';
export { default as eslint, tpl_eslint } from './eslint';
export { default as eslintignore, tpl_ignore_eslint } from './ignore/eslintignore';
export { default as gitignore, tpl_ignore_git } from './ignore/gitignore';
export { default as npmignore, tpl_ignore_npm } from './ignore/npmignore';
export { default as prettierignore, tpl_ignore_prettier } from './ignore/prettierignore';
export { default as jest, tpl_jest } from './jest';
export { default as omni, tpl_omni } from './omni';
export { default as pkj, tpl_package } from './package';
export { default as prettier, tpl_prettier } from './prettier';
export { default as readme, tpl_readme } from './readme';
export { default as tsconfig, tpl_tsconfig } from './tsconfig';
export { default as stylelint,tpl_stylelint } from './stylelint';
export { default as source_index_react, tpl_src_index } from './source/index_react';
export { default as source_html, tpl_src_html } from './source/html';
export { default as source_d, tpl_src_declaration } from './source/declaration';
export { default as source_index_style, tpl_src_style } from './source/style';
export { default as source_index_reset, tpl_src_reset } from './source/reset';
export { default as webpack_config_common, tpl_webpack_common } from './webpack/common';
export { default as webpack_config_dev, tpl_webpack_dev } from './webpack/dev';
export { default as webpack_config_prod, tpl_webpack_prod } from './webpack/prod';
export { default as component_class, tpl_new_class } from './new/component_class';
export { default as component_functional, tpl_new_functional } from './new/component_functional';
export { default as component_index, tpl_new_index } from './new/index';
export { default as component_readme, tpl_new_readme } from './new/readme';
export { default as component_stylesheet, tpl_new_stylesheet } from './new/stylesheet';
export { default as component_test, tpl_new_test } from './new/test';

export const tpls = {
  babel,
  commitlint,
  eslint,
  eslintignore,
  gitignore,
  jest,
  npmignore,
  prettierignore,
  omni,
  pkj,
  prettier,
  readme,
  stylelint,
  tsconfig,
  source_index_react,
  source_html,
  source_d,
  source_index_style,
  source_index_reset,
  webpack_config_common,
  webpack_config_dev,
  webpack_config_prod,
  component_class,
  component_functional,
  component_index,
  component_readme,
  component_stylesheet,
  component_test
};

export const tpls_origin = {
  tpl_babel,
  tpl_commitlint,
  tpl_eslint,
  tpl_ignore_eslint,
  tpl_ignore_git,
  tpl_jest,
  tpl_ignore_npm,
  tpl_ignore_prettier,
  tpl_omni,
  tpl_package,
  tpl_readme,
  tpl_prettier,
  tpl_stylelint,
  tpl_tsconfig,
  tpl_src_index,
  tpl_src_html,
  tpl_src_declaration,
  tpl_src_style,
  tpl_src_reset,
  tpl_webpack_common,
  tpl_webpack_dev,
  tpl_webpack_prod,
  tpl_new_class,
  tpl_new_functional,
  tpl_new_index,
  tpl_new_readme,
  tpl_new_stylesheet,
  tpl_new_test
};

type TPLS = {
  [T in keyof typeof tpls]: typeof tpls[T];
};

type TPLS_ORIGIN = {
  [T in keyof typeof tpls_origin]: typeof tpls_origin[T];
};

export type TPLS_INITIAL = Omit<TPLS,
  'component_class' |
  'component_functional' |
  'component_index' |
  'component_readme' |
  'component_stylesheet' |
  'component_test'
>;

export type TPLS_ORIGIN_INITIAL = Omit<TPLS_ORIGIN,
  'tpl_new_class' |
  'tpl_new_functional' |
  'tpl_new_index' |
  'tpl_new_readme' |
  'tpl_new_stylesheet' |
  'tpl_new_test'
>;

export type TPLS_INITIAL_FN = TPLS_INITIAL[keyof TPLS_INITIAL];

export type TPLS_INITIAL_RETURE = Partial<TPLS_INITIAL>;

export type TPLS_NEW = Pick<TPLS,
  'component_class' |
  'component_functional' |
  'component_index' |
  'component_readme' |
  'component_stylesheet' |
  'component_test'
>;

export type TPLS_ORIGIN_NEW = Pick<TPLS_ORIGIN,
  'tpl_new_class' |
  'tpl_new_functional' |
  'tpl_new_index' |
  'tpl_new_readme' |
  'tpl_new_stylesheet' |
  'tpl_new_test'
>;

export type TPLS_NEW_FN = TPLS_NEW[keyof TPLS_NEW];

export type TPLS_NEW_RETURE = Partial<TPLS_NEW>;

export default tpls;