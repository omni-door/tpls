import path from 'path';
import {
  output_file,
  logInfo,
  logWarn,
  logTime,
  STYLE,
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
  logTime('创建组件');
  logInfo(`开始创建 ${componentName} ${type === 'cc' ? '类' : '函数'}组件 (Start create ${componentName} ${type === 'cc' ? 'class' : 'functional'} component)`);
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
    logWarn('生成自定义模板出错，将全部使用默认模板进行创建组件！(The custom template generating occured error, all will be initializated with the default template!)');
  }
  const tpl = { ...tpls_new, ...custom_tpl_new_list };
  const params = {
    ts,
    test,
    componentName,
    style: stylesheet,
    md
  };
  // component tpl
  const content_index = tpl.component_index(params);
  const content_interface = ts && tpl.component_interface({ ...params, cc: type === 'cc' });
  const content_cc = type === 'cc' && tpl.component_class(params);
  const content_fc = type === 'fc' && tpl.component_functional(params);
  const content_readme = md === 'md' && tpl.component_readme(params);
  const content_mdx = md === 'mdx' && tpl.component_mdx(params);
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
    [`__stories__/index.stories.${
      ts
        ? 'tsx'
        : 'jsx'
    }`]: content_stories,
    'README.md': content_readme,
    'README.mdx': content_mdx,
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
  logTime('创建组件', true);
}

export default $new;