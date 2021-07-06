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
import prettier, { tpl_prettier } from './prettier';
import readme, { tpl_readme } from './readme';
import readme_cn, { tpl_readme_cn } from './readme/index.zh-CN';
import readme_dev, { tpl_readme_dev } from './readme/dev';
import readme_dev_cn, { tpl_readme_dev_cn } from './readme/dev.zh-CN';
import tsconfig, { tpl_tsconfig } from './tsconfig';
import vscode, { tpl_vscode_setting } from './vsc';
import stylelint, { tpl_stylelint } from './stylelint';
import styleguidist, { tpl_styleguidist } from './styleguidist';
import source_index, { tpl_src_index } from './source/index';
import source_classnames, { tpl_src_classnames } from './source/classnames';
import source_d, { tpl_src_declaration } from './source/declaration';
import storybook_addons, { tpl_storybook_addons } from './storybook/addons';
import storybook_config, { tpl_storybook_config } from './storybook/config';
import storybook_mhead, { tpl_storybook_mhead } from './storybook/manager-head';
import storybook_webpack, { tpl_storybook_webpack } from './storybook/webpack';
import storybook_theme, { tpl_storybook_theme } from './storybook/theme';
import bisheng, { tpl_bisheng } from './bisheng';
import posts_readme, { tpl_bisheng_posts } from './bisheng/posts';
import doczrc, { tpl_docz } from './docz';
import gatsby, { tpl_gatsby } from './docz/gatsby';
import mdx, { tpl_docz_mdx } from './docz/mdx';
import component_class, { tpl_new_class } from './new/class_component';
import component_functional, { tpl_new_functional } from './new/functional_component';
import component_index, { tpl_new_index } from './new/index';
import component_interface, { tpl_new_interface } from './new/interface';
import component_readme, { tpl_new_readme } from './new/readme';
import component_style, { tpl_new_style } from './new/style';
import component_stylesheet, { tpl_new_stylesheet } from './new/stylesheet';
import component_test, { tpl_new_test } from './new/test';
import component_mdx, { tpl_new_mdx } from './new/mdx';
import component_stories, { tpl_new_story } from './new/stories';

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
export { default as prettier, tpl_prettier } from './prettier';
export { default as readme, tpl_readme } from './readme';
export { default as readme_cn, tpl_readme_cn } from './readme/index.zh-CN';
export { default as readme_dev, tpl_readme_dev } from './readme/dev';
export { default as readme_dev_cn, tpl_readme_dev_cn } from './readme/dev.zh-CN';
export { default as tsconfig, tpl_tsconfig } from './tsconfig';
export { default as vscode, tpl_vscode_setting } from './vsc';
export { default as stylelint, tpl_stylelint } from './stylelint';
export { default as styleguidist, tpl_styleguidist } from './styleguidist';
export { default as source_index, tpl_src_index } from './source/index';
export { default as source_classnames, tpl_src_classnames } from './source/classnames';
export { default as source_d, tpl_src_declaration } from './source/declaration';
export { default as storybook_addons, tpl_storybook_addons } from './storybook/addons';
export { default as storybook_config, tpl_storybook_config } from './storybook/config';
export { default as storybook_mhead, tpl_storybook_mhead } from './storybook/manager-head';
export { default as storybook_webpack, tpl_storybook_webpack } from './storybook/webpack';
export { default as storybook_theme, tpl_storybook_theme } from './storybook/theme';
export { default as bisheng, tpl_bisheng } from './bisheng';
export { default as posts_readme, tpl_bisheng_posts } from './bisheng/posts';
export { default as doczrc, tpl_docz } from './docz';
export { default as gatsby, tpl_gatsby } from './docz/gatsby';
export { default as mdx, tpl_docz_mdx } from './docz/mdx';
export { default as component_class, tpl_new_class } from './new/class_component';
export { default as component_functional, tpl_new_functional } from './new/functional_component';
export { default as component_index, tpl_new_index } from './new/index';
export { default as component_interface, tpl_new_interface } from './new/interface';
export { default as component_readme, tpl_new_readme } from './new/readme';
export { default as component_style, tpl_new_style } from './new/style';
export { default as component_stylesheet, tpl_new_stylesheet } from './new/stylesheet';
export { default as component_test, tpl_new_test } from './new/test';
export { default as component_mdx, tpl_new_mdx } from './new/mdx';
export { default as component_stories, tpl_new_story } from './new/stories';

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
  prettier,
  readme,
  readme_cn,
  readme_dev,
  readme_dev_cn,
  stylelint,
  styleguidist,
  tsconfig,
  vscode,
  source_index,
  source_classnames,
  source_d,
  storybook_addons,
  storybook_config,
  storybook_mhead,
  storybook_webpack,
  storybook_theme,
  doczrc,
  gatsby,
  bisheng,
  posts_readme,
  mdx
};

export const tpls_origin_init = {
  tpl_babel,
  tpl_bisheng,
  tpl_bisheng_posts,
  tpl_commitlint,
  tpl_editor,
  tpl_docz,
  tpl_docz_mdx,
  tpl_eslint,
  tpl_gatsby,
  tpl_ignore_eslint,
  tpl_ignore_git,
  tpl_ignore_npm,
  tpl_ignore_prettier,
  tpl_jest,
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
  tpl_storybook_addons,
  tpl_storybook_config,
  tpl_storybook_mhead,
  tpl_storybook_webpack,
  tpl_storybook_theme,
  tpl_styleguidist,
  tpl_stylelint,
  tpl_tsconfig,
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
  component_class,
  component_functional,
  component_index,
  component_interface,
  component_readme,
  component_style,
  component_stylesheet,
  component_test,
  component_mdx,
  component_stories
};

export const tpls_origin_new = {
  tpl_new_class,
  tpl_new_functional,
  tpl_new_index,
  tpl_new_interface,
  tpl_new_mdx,
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