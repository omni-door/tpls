import path from 'path';
import {
  logInfo,
  logWarn,
  logTime,
  logErr,
  outputFile,
} from '@omni-door/utils';
import {
  tpls_new,
  tpls_origin_new
} from './templates';
/* import types */
import type { STYLE } from '@omni-door/utils';
import type {
  TPLS_ORIGIN_NEW,
  TPLS_NEW_FN,
  TPLS_NEW_RETURE
} from './templates';

export function $new ({
  ts,
  test,
  componentName,
  stylesheet,
  newPath,
  md,
  type,
  tpls
}: {
  ts: boolean;
  test: boolean;
  componentName: string;
  stylesheet: STYLE;
  newPath: string;
  md?: boolean;
  type: 'fc' | 'cc';
  tpls?: (tpls: TPLS_ORIGIN_NEW) => TPLS_NEW_RETURE;
}) {
  logTime('CREATE');
  logInfo(`Start creating ${componentName} ${type === 'cc' ? 'class' : 'functional'} component`);

  let custom_tpl_new_list = {};
  try {
    custom_tpl_new_list = typeof tpls === 'function'
      ? tpls(tpls_origin_new)
      : custom_tpl_new_list;

    for (const tpl_name in custom_tpl_new_list) {
      const name = tpl_name as keyof TPLS_NEW_RETURE;
      const list = custom_tpl_new_list as TPLS_NEW_RETURE;
      const tpl = list[name];
      const tplFactory = (config: any) => {
        try {
          return tpl && tpl(config);
        } catch (err) {
          logWarn(err as any);
          logWarn(`The custom template "${name}" parsing encountered an error; the default template will be used for initialization`);

        }

        return tpls_new[name](config);
      };

      (list[name] as TPLS_NEW_FN) = tplFactory as TPLS_NEW_FN;
    }
  } catch (err_tpls) {
    logWarn(err_tpls as any);
    logWarn('Custom template generation failed; all templates will be initialized with the default template');

  }
  const tpl = { ...tpls_new, ...custom_tpl_new_list };
  const params = {
    ts,
    test,
    componentName,
    style: stylesheet,
    md
  };

  try {
    // component tpl
    const content_index = tpl.component_index(params);
    const content_cc = type === 'cc' && tpl.component_class(params);
    const content_fc = type === 'fc' && tpl.component_functional(params);
    const content_readme = md && tpl.component_readme(params);
    const content_style = stylesheet && tpl.component_stylesheet(params);
    const content_test = test && tpl.component_test(params);

    const pathToFileContentMap = {
      [`${componentName}.${ts ? 'tsx' : 'jsx'}`]: content_fc || content_cc,
      [`style/${componentName}.${stylesheet}`]: content_style,
      [`__test__/index.test.${
        ts
          ? 'tsx'
          : 'jsx'
      }`]: content_test,
      [`index.${ts ? 'ts' : 'js'}`]: content_index,
      'README.md': content_readme
    };

    /**
     * create files
     */
    const file_path = (p: string) => path.resolve(newPath, p);
    for (const p in pathToFileContentMap) {
      outputFile({
        file_path: file_path(p),
        file_content: pathToFileContentMap[p]
      });
    }
  } catch (e) {
    const err = e as any;
    logErr(`${err.name}: ${err.message} at \n${err.stack}`);
    logErr('Component creation failed');

    process.exit(1);
  }
  logTime('CREATE', true);
}

export default $new;