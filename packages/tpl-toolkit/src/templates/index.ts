import babel, { tpl_babel } from './babel';
import commitlint, { tpl_commitlint } from './commitlint';
import editor, { tpl_editor } from './editor';
import eslint, { tpl_eslint } from './eslint';
import eslintignore, { tpl_ignore_eslint } from './ignore/eslintignore';
import gitignore, { tpl_ignore_git } from './ignore/gitignore';
import npmignore, { tpl_ignore_npm } from './ignore/npmignore';
import omni, { tpl_omni } from './omni';
import pkj, { tpl_package } from './package';
import prettier, { tpl_prettier } from './prettier';
import prettierignore, { tpl_ignore_prettier } from './ignore/prettierignore';
import readme, { tpl_readme } from './readme';
import rollup, { tpl_rollup } from './rollup';
import tsconfig, { tpl_tsconfig } from './tsconfig';
import indexTpl, { tpl_src_index } from './source';
import getTsTpl, { tpl_src_get_ts } from './source/get_ts';
import karma, { tpl_karma } from './karma';
import mocha, { tpl_mocha } from './mocha';
import component_index, { tpl_new_index } from './new/index';
import component_readme, { tpl_new_readme } from './new/readme';
import component_test, { tpl_new_test } from './new/test';
import umirc, { tpl_umirc } from './umi/umirc';
import env, { tpl_env } from './umi/env';
import vscode, { tpl_vscode_setting } from './vsc';

export { default as babel, tpl_babel } from './babel';
export { default as commitlint, tpl_commitlint } from './commitlint';
export { default as editor, tpl_editor } from './editor';
export { default as eslint, tpl_eslint } from './eslint';
export { default as eslintignore, tpl_ignore_eslint } from './ignore/eslintignore';
export { default as gitignore, tpl_ignore_git } from './ignore/gitignore';
export { default as npmignore, tpl_ignore_npm } from './ignore/npmignore';
export { default as omni, tpl_omni } from './omni';
export { default as pkj, tpl_package } from './package';
export { default as prettier, tpl_prettier } from './prettier';
export { default as prettierignore, tpl_ignore_prettier } from './ignore/prettierignore';
export { default as readme, tpl_readme } from './readme';
export { default as rollup, tpl_rollup } from './rollup';
export { default as tsconfig, tpl_tsconfig } from './tsconfig';
export { default as indexTpl, tpl_src_index } from './source';
export { default as getTsTpl, tpl_src_get_ts } from './source/get_ts';
export { default as karma, tpl_karma } from './karma';
export { default as mocha, tpl_mocha } from './mocha';
export { default as component_index, tpl_new_index } from './new/index';
export { default as component_readme, tpl_new_readme } from './new/readme';
export { default as component_test, tpl_new_test } from './new/test';
export { default as umirc, tpl_umirc } from './umi/umirc';
export { default as env, tpl_env } from './umi/env';
export { default as vscode, tpl_vscode_setting } from './vsc';

/* -- templates - init --  */
export const tpls_init = {
  babel,
  commitlint,
  editor,
  eslint,
  eslintignore,
  gitignore,
  npmignore,
  omni,
  pkj,
  prettier,
  prettierignore,
  readme,
  rollup,
  tsconfig,
  indexTpl,
  getTsTpl,
  karma,
  mocha,
  umirc,
  env,
  vscode
};

export const tpls_origin_init = {
  tpl_babel,
  tpl_commitlint,
  tpl_editor,
  tpl_eslint,
  tpl_ignore_eslint,
  tpl_ignore_git,
  tpl_ignore_npm,
  tpl_omni,
  tpl_package,
  tpl_prettier,
  tpl_readme,
  tpl_rollup,
  tpl_src_index,
  tpl_src_get_ts,
  tpl_tsconfig,
  tpl_ignore_prettier,
  tpl_karma,
  tpl_mocha,
  tpl_umirc,
  tpl_env,
  tpl_vscode_setting
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
  component_index,
  component_readme,
  component_test,
};

export const tpls_origin_new = {
  tpl_new_index,
  tpl_new_readme,
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