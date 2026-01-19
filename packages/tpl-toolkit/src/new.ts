import path from 'path';
import {
  outputFile,
  logInfo,
  logWarn,
  logTime,
  logErr
} from '@omni-door/utils';
import {
  tpls_new,
  tpls_origin_new
} from './templates';
/* import types */
import type {
  TPLS_ORIGIN_NEW,
  TPLS_NEW_FN,
  TPLS_NEW_RETURE
} from './templates';

export function $new ({
  ts,
  test,
  componentName,
  newPath,
  md,
  tpls
}: {
  ts: boolean;
  test: boolean;
  componentName: string;
  newPath: string;
  md?: boolean;
  tpls?: (tpls: TPLS_ORIGIN_NEW) => TPLS_NEW_RETURE;
}) {
  logTime('CREATE');
  logInfo(`Start creating ${componentName} module`);

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
    md
  };

  try {
    // component tpl
    const content_index = tpl.component_index(params);
    const content_readme = md && tpl.component_readme(params);
    const content_test = test && tpl.component_test(params);

    const pathToFileContentMap = {
      [`index.${ts ? 'ts' : 'js'}`]: content_index,
      [`__test__/index.test.${
        ts
          ? 'ts'
          : 'js'
      }`]: content_test,
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
    logErr('Module creation failed');

    process.exit(1);
  }
  
  logTime('CREATE', true);
}

export default $new;