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
import type { STYLE, MARKDOWN } from '@omni-door/utils';
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
  hasStorybook,
  tpls
}: {
  ts: boolean;
  test: boolean;
  componentName: string;
  stylesheet: STYLE;
  newPath: string;
  md?: MARKDOWN;
  type: 'fc' | 'cc';
  hasStorybook: boolean;
  tpls?: (tpls: TPLS_ORIGIN_NEW) => TPLS_NEW_RETURE;
}) {
  logTime('CREATE(创建组件)');
  logInfo(`Start create ${componentName} ${type === 'cc' ? 'class' : 'functional'} component`);
  logInfo(`开始创建 ${componentName} ${type === 'cc' ? '类' : '函数'}组件`);
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
          logWarn(`The custom template "${name}" parsing occured error, the default template will be used for initialization`);
          logWarn(`自定义模板 "${name}" 解析出错，将使用默认模板进行创建组件`);
        }

        return tpls_new[name](config);
      };

      (list[name] as TPLS_NEW_FN) = tplFactory as TPLS_NEW_FN;
    }
  } catch (err_tpls) {
    logWarn(err_tpls as any);
    logWarn('The custom template generating occured error, all will be initializated with the default template');
    logWarn('生成自定义模板出错，将全部使用默认模板进行创建模块');
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
    const content_interface = ts && tpl.component_interface({ ...params, cc: type === 'cc' });
    const content_cc = type === 'cc' && tpl.component_class(params);
    const content_fc = type === 'fc' && tpl.component_functional(params);
    const content_readme = tpl.component_readme(params);
    const content_stories = hasStorybook && tpl.component_stories(params);
    const content_style = stylesheet && tpl.component_style(params);
    const content_stylesheet = stylesheet && tpl.component_stylesheet(params);
    const content_test = test && tpl.component_test(params);

    const pathToFileContentMap = {
      [`index.${ts ? 'ts' : 'js'}`]: content_index,
      [`${componentName}.${ts ? 'tsx' : 'jsx'}`]: content_fc || content_cc,
      'interface.ts': content_interface,
      [`style/index.${ts ? 'ts' : 'js'}`]: content_style,
      [`style/${componentName}.${stylesheet}`]: content_stylesheet,
      [`__test__/index.test.${
        ts
          ? 'tsx'
          : 'jsx'
      }`]: content_test,
      [`${componentName}.stories.${
        ts
          ? 'tsx'
          : 'jsx'
      }`]: content_stories,
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
    logErr('The process of create component failed');
    logErr('创建组件失败');
    process.exit(1);
  }
  logTime('CREATE(创建组件)', true);
}

export default $new;