import omni, { tpl_omni } from './omni';
import pkj, { tpl_package } from './package';
import readme, { tpl_readme } from './readme';
import component_readme, { tpl_new_readme } from './new/readme';

export { default as omni, tpl_omni } from './omni';
export { default as pkj, tpl_package } from './package';
export { default as readme, tpl_readme } from './readme';
export { default as component_readme, tpl_new_readme } from './new/readme';

/* -- templates - init --  */
export const tpls_init = {
  omni,
  pkj,
  readme
};

export const tpls_origin_init = {
  tpl_omni,
  tpl_package,
  tpl_readme
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
  component_readme
};

export const tpls_origin_new = {
  tpl_new_readme
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
