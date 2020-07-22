import path from 'path';
import {
  output_file,
  logInfo,
  logWarn,
  logTime,
  MARKDOWN
} from '@omni-door/utils';
import {
  TPLS_ORIGIN_NEW,
  TPLS_NEW_FN,
  TPLS_NEW_RETURE,
  tpls_new,
  tpls_origin_new
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
  md?: MARKDOWN;
  tpls?: (tpls: TPLS_ORIGIN_NEW) => TPLS_NEW_RETURE;
}) {
  logTime('创建模板');
  logInfo(`开始创建 ${componentName} 模板 (Start create ${componentName} template)`);
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
          logWarn(err);
          logWarn(`自定义模板 [${name}] 解析出错，将使用默认模板进行创建组件！(The custom template [${name}] parsing occured error, the default template will be used for initialization!)`);    
        }

        return tpls_new[name](config);
      };

      (list[name] as TPLS_NEW_FN) = tplFactory as TPLS_NEW_FN;
    }
  } catch (err_tpls) {
    logWarn(err_tpls);
    logWarn('生成自定义模板出错，将全部使用默认模板进行创建模板！(The custom template generating occured error, all will be initializated with the default template!)');
  }
  const tpl = { ...tpls_new, ...custom_tpl_new_list };
  const params = {
    ts,
    test,
    componentName,
    style: '' as any,
    md
  };
  if (md === 'mdx') logInfo('暂不支持 mdx 文档格式，使用 md 代替！(Not support mdx format replace to md format!)');

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
    output_file({
      file_path: file_path(p),
      file_content: pathToFileContentMap[p]
    });
  }
  logTime('创建模板', true);
}

export default $new;