import path from 'path';
import {
  arr2str,
  intersection,
  logWarn,
  logErr,
  logTime,
  exec,
  outputFile,
} from '@omni-door/utils';
import {
  tpls_init,
  tpls_origin_init
} from './templates';
import { dependencies, devDependencies } from './configs/dependencies';
import { devDependencies as devDependencyMap } from './configs/dependencies_stable_map';
/* import types */
import type {
  PKJ_TOOL,
  STYLE,
  STRATEGY,
  SSR_SERVER
} from '@omni-door/utils';
import type {
  TPLS_INITIAL,
  TPLS_ORIGIN_INITIAL,
  TPLS_INITIAL_FN,
  TPLS_INITIAL_RETURE
} from './templates';

export type ResultOfDependencies = string[] | { add?: string[]; remove?: string[]; };
export type InitOptions = {
  strategy: STRATEGY;
  projectName: string;
  initPath: string;
  configFileName?: string;
  git?: string;
  ts: boolean;
  test: boolean;
  eslint: boolean;
  prettier: boolean;
  commitlint: boolean;
  style: STYLE;
  stylelint: boolean;
  install: boolean;
  pkgtool?: PKJ_TOOL;
  isSlient?: boolean;
  ssrServer?: SSR_SERVER;
  tag?: string;
  tpls?: (tpls: TPLS_ORIGIN_INITIAL) => TPLS_INITIAL_RETURE;
  dependencies?: (dependecies_default: string[]) => ResultOfDependencies;
  devDependencies?: (devDependecies_default: string[]) => ResultOfDependencies;
  error?: (err: any) => any;
  success?: (results: any[]) => any;
};

export async function $init ({
  strategy = 'stable',
  projectName: project_name,
  initPath,
  configFileName = 'omni.config.js',
  git = '',
  ts,
  test,
  eslint,
  prettier,
  commitlint,
  style,
  stylelint,
  install,
  tpls,
  pkgtool = 'pnpm',
  isSlient,
  ssrServer = 'next-app',
  tag,
  dependencies: dependencies_custom,
  devDependencies: devDependencies_custom,
  error = () => process.exit(1),
  success = () => {}
}: InitOptions) {
  let installCliPrefix, installDevCliPrefix, installReadMe, runScript, paramScript;
  switch (pkgtool) {
    case 'pnpm':
      installCliPrefix = `${pkgtool} add -P --save-exact --prefix ${initPath}`;
      installDevCliPrefix = `${pkgtool} add -D --save-exact --prefix ${initPath}`;
      installReadMe = `${pkgtool} install`;
      runScript = `${pkgtool}`;
      paramScript = '-- -';
      break;
    case 'yarn':
      installCliPrefix = `${pkgtool} add --cwd ${initPath}`;
      installDevCliPrefix = `${pkgtool} add -D --cwd ${initPath}`;
      installReadMe = `${pkgtool}`;
      runScript = `${pkgtool}`;
      paramScript = '-';
      break;
    case 'npm':
    default:
      installCliPrefix = `${pkgtool} install --save --save-exact --prefix ${initPath}`;
      installDevCliPrefix = `${pkgtool} install --save-dev --save-exact --prefix ${initPath}`;
      installReadMe = `${pkgtool} install`;
      runScript = `${pkgtool} run`;
      paramScript = '-- -';
  }

  // 模板解析
  logTime('PARSE(模板解析)');
  let custom_tpl_list: ReturnType<Exclude<typeof tpls, undefined>> = {};
  try {
    custom_tpl_list = typeof tpls === 'function'
      ? tpls(tpls_origin_init)
      : custom_tpl_list;

    for (const tpl_name in custom_tpl_list) {
      const name = tpl_name as keyof typeof custom_tpl_list;
      const list = custom_tpl_list;
      type CustomTpl = TPLS_INITIAL_RETURE[keyof TPLS_INITIAL_RETURE];
      type OriginTpl = TPLS_INITIAL[keyof TPLS_INITIAL];
      const tplFactory = (customTpl: CustomTpl, originTpl: OriginTpl) => {
        return function (config: any) {
          try {
            const result = customTpl && customTpl(config);
            if (typeof result === 'function') {
              // call originTpl here is resolving the address reference bug
              // because call the originTpl will affect the tpls_origin_init's tpl
              const originResult = originTpl(config);
              if (typeof originResult === 'function') {
                return tplFactory(result, originResult);
              }
            }
            return result;
          } catch (err) {
            logWarn(err as any);
            logWarn(`The custom template "${name}" parsing occured error, the default template will be used for initialization`);
            logWarn(`自定义模板 "${name}" 解析出错，将使用默认模板进行初始化`);
            return originTpl(config);
          }
        };
      };
      (list[name] as TPLS_INITIAL_FN) = tplFactory(list[name], tpls_init[name]) as TPLS_INITIAL_FN;
    }
  } catch (err_tpls) {
    logWarn(err_tpls as any);
    logWarn('The custom template generating occured error, all will be initializated with the default template');
    logWarn('生成自定义模板出错，将全部使用默认模板进行初始化');
  }
  const tpl = { ...tpls_init, ...custom_tpl_list };
  const project_type = 'ssr-react' as 'ssr-react';
  logTime('PARSE(模板解析)', true);

  // 生成项目文件
  logTime('CREATE(创建文件)');
  const params = { project_type, project_name, ts, test, eslint, prettier, commitlint, style, stylelint: !!style && stylelint, strategy, configFileName, serverType: ssrServer };
  try {
    const suffix_stylesheet = style && style === 'all' ? 'scss' : style;
    const pathToFileContentMap = {
      // default
      [`configs/${configFileName}`]: tpl.omni({ ...params, git }),
      'package.json': install && tpl.pkj(devDependencyMap['@types/react'])({ ...params, install, dependencies: '', devDependencies: '' }),
      '.gitignore': tpl.gitignore(params),
      [`src/styles/reset.${suffix_stylesheet}`]: style && tpl.source_index_reset(params),
      // app
      [`app/page.${ts ? 'tsx' : 'jsx'}`]: ssrServer === 'next-app' && tpl.source_app_page({ ...params, pageName: 'Home' }),
      [`app/start/page.${ts ? 'tsx' : 'jsx'}`]: ssrServer === 'next-app' && tpl.source_app_page({ ...params, pageName: 'Start' }),
      [`app/docs/page.${ts ? 'tsx' : 'jsx'}`]: ssrServer === 'next-app' && tpl.source_app_page({ ...params, pageName: 'Docs' }),
      [`app/layout.${ts ? 'tsx' : 'jsx'}`]: ssrServer === 'next-app' && tpl.source_app_layout(params),
      // pages
      [`pages/index.${ts ? 'tsx' : 'jsx'}`]: ssrServer === 'next-pages' && tpl.source_page_index({ ...params, pageName: 'Home' }),
      [`pages/start.${ts ? 'tsx' : 'jsx'}`]: ssrServer === 'next-pages' && tpl.source_page_index({ ...params, pageName: 'Start' }),
      [`pages/docs.${ts ? 'tsx' : 'jsx'}`]: ssrServer === 'next-pages' && tpl.source_page_index({ ...params, pageName: 'Docs' }),
      [`pages/_app.${ts ? 'tsx' : 'jsx'}`]: ssrServer === 'next-pages' && tpl.source_page_app(params),
      // components - Home
      [`src/components/Home/index.${ts ? 'ts' : 'js'}`]: tpl.source_component_index({ ...params, componentName: 'Home' }),
      [`src/components/Home/Home.${ts ? 'tsx' : 'jsx'}`]: tpl.source_component_cp({ ...params, componentName: 'Home' }),
      [`src/components/Home/style/Home.module.${suffix_stylesheet}`]: style && tpl.source_component_style({ ...params, componentName: 'Home' }),
      // components - Start
      [`src/components/Start/index.${ts ? 'ts' : 'js'}`]: tpl.source_component_index({ ...params, componentName: 'Start' }),
      [`src/components/Start/Start.${ts ? 'tsx' : 'jsx'}`]: tpl.source_component_cp({ ...params, componentName: 'Start' }),
      [`src/components/Start/style/Start.module.${suffix_stylesheet}`]: style && tpl.source_component_style({ ...params, componentName: 'Start' }),
      // components - Docs
      [`src/components/Docs/index.${ts ? 'ts' : 'js'}`]: tpl.source_component_index({ ...params, componentName: 'Docs' }),
      [`src/components/Docs/Docs.${ts ? 'tsx' : 'jsx'}`]: tpl.source_component_cp({ ...params, componentName: 'Docs' }),
      [`src/components/Docs/style/Docs.module.${suffix_stylesheet}`]: style && tpl.source_component_style({ ...params, componentName: 'Docs' }),
      // components - Layout
      [`src/components/Layout/index.${ts ? 'ts' : 'js'}`]: tpl.source_component_index({ ...params, componentName: 'Layout' }),
      [`src/components/Layout/Layout.${ts ? 'tsx' : 'jsx'}`]: tpl.source_component_layout({ ...params, componentName: 'Layout' }),
      [`src/components/Layout/style/Layout.module.${suffix_stylesheet}`]: style && tpl.source_component_layout_style({ ...params, componentName: 'Layout' }),
      // utils
      [`src/utils/mapCtxToProps.${ts ? 'ts' : 'js'}`]: ssrServer === 'next-pages' && tpl.source_utils_mapctx(params),
      [`src/utils/paramsToQueryString.${ts ? 'ts' : 'js'}`]: tpl.source_utils_params(params),
      // next configs
      'next.config.js': tpl.nextConfig(params),
      'next-env.d.ts': ts && tpl.nextDeclartion(params),
      'postcss.config.js': style && tpl.postcss(params),
      // webpack
      'configs/webpack.config.js': tpl.webpack(params),
      // typescript
      'tsconfig.json': ts && tpl.tsconfig(params),
      // unit test
      'configs/jest.config.js': test && tpl.jest(params),
      // lint
      '.vscode/settings.json': tpl.vscode(params),
      '.editorconfig': (eslint || prettier) && tpl.editor(params),
      'configs/.eslintrc.js': eslint && tpl.eslint(params),
      '.eslintignore': eslint && tpl.eslintignore(params),
      'configs/prettier.config.js': prettier && tpl.prettier(params),
      '.prettierignore': prettier && tpl.prettierignore(params),
      'configs/stylelint.config.js': stylelint && tpl.stylelint(params),
      'configs/commitlint.config.js': commitlint && tpl.commitlint(params),
      // build
      'babel.config.js': tpl.babel(params),
      // docs
      'README.md': tpl.readme({ ...params, install: installReadMe, runScript, paramScript }),
      'README.zh-CN.md': tpl.readme_cn({ ...params, install: installReadMe, runScript, paramScript }),
      // husky
      '.husky/commit-msg': commitlint && tpl.husky_commit_msg(params),
      '.husky/pre-commit': commitlint && tpl.husky_pre_commit(params),
      '.husky/pre-push': commitlint && tpl.husky_pre_push(params),
    };
    const file_path = (p: string) => path.resolve(initPath, p);
    for (const p in pathToFileContentMap) {
      outputFile({
        file_path: file_path(p),
        file_content: pathToFileContentMap[p as keyof typeof pathToFileContentMap]
      });
    }
  } catch (e) {
    const err = e as any;
    logErr(`${err.name}: ${err.message} at \n${err.stack}`);
    error ? error(err) : process.exit(1);
  }
  logTime('CREATE(创建文件)', true);

  // 项目依赖解析
  logTime('DEPENDENCY(依赖解析)');
  const dependenciesOptions = {
    ts,
    eslint,
    prettier,
    commitlint,
    style,
    stylelint,
    test,
    ssrServer,
    tag
  };

  let {
    depArr,
    depStr
  } = await dependencies(strategy, dependenciesOptions);
  let dependencies_str = depStr;
  if (typeof dependencies_custom === 'function') {
    const result = dependencies_custom(depArr);
    if (result instanceof Array) {
      dependencies_str = `${depStr} ${arr2str(result)}`;
    } else {
      const { add = [], remove = [] } = result;
      for (let i = 0; i < remove.length; i++) {
        const item_rm = remove[i];
        depArr = [ ...intersection(depArr, depArr.filter(v => v !== item_rm)) ];
      }
      dependencies_str = `${arr2str(depArr)} ${arr2str(add)}`;
    }
  }

  const installCli = dependencies_str ? `${installCliPrefix} ${dependencies_str}` : '';
  let {
    defaultDepArr,
    defaultDepStr,
    nextDepArr,
    nextDepStr,
    tsDepArr,
    tsDepStr,
    testDepStr,
    testDepArr,
    eslintDepArr,
    eslintDepStr,
    prettierDepArr,
    prettierDepStr,
    commitlintDepArr,
    commitlintDepStr,
    stylelintDepArr,
    stylelintDepStr,
    serverDepArr,
    serverDepStr,
    devDepArr
  } = await devDependencies(strategy, dependenciesOptions);

  let customDepStr;
  if (typeof devDependencies_custom === 'function') {
    const result = devDependencies_custom(devDepArr);
    if (result instanceof Array) {
      customDepStr = arr2str(result);
    } else {
      const { add = [], remove = [] } = result;
      for (let i = 0; i < remove.length; i++) {
        const item_rm = remove[i];
        defaultDepArr = [ ...intersection(defaultDepArr, defaultDepArr.filter(v => v !== item_rm)) ];
        nextDepArr = [ ...intersection(nextDepArr, nextDepArr.filter(v => v !== item_rm)) ];
        tsDepArr = [ ...intersection(tsDepArr, tsDepArr.filter(v => v !== item_rm)) ];
        testDepArr = [ ...intersection(testDepArr, testDepArr.filter(v => v !== item_rm)) ];
        eslintDepArr = [ ...intersection(eslintDepArr, eslintDepArr.filter(v => v !== item_rm)) ];
        prettierDepArr = [ ...intersection(prettierDepArr, prettierDepArr.filter(v => v !== item_rm)) ];
        commitlintDepArr = [ ...intersection(commitlintDepArr, commitlintDepArr.filter(v => v !== item_rm)) ];
        stylelintDepArr = [ ...intersection(stylelintDepArr, stylelintDepArr.filter(v => v !== item_rm)) ];
        serverDepArr = [ ...intersection(serverDepArr, serverDepArr.filter(v => v !== item_rm)) ];
      }
      defaultDepStr = arr2str(defaultDepArr);
      nextDepStr = arr2str(nextDepArr);
      tsDepStr = arr2str(tsDepArr);
      testDepStr = arr2str(testDepArr);
      eslintDepStr = arr2str(eslintDepArr);
      prettierDepStr = arr2str(prettierDepArr);
      commitlintDepStr = arr2str(commitlintDepArr);
      stylelintDepStr = arr2str(stylelintDepArr);
      serverDepStr = arr2str(serverDepArr);
      customDepStr = arr2str(add);
    }
  }

  const installDevCliArr = [];
  defaultDepStr && installDevCliArr.push(defaultDepStr);
  nextDepStr && installDevCliArr.push(nextDepStr);
  tsDepStr && installDevCliArr.push(tsDepStr);
  testDepStr && installDevCliArr.push(testDepStr);
  eslintDepStr && installDevCliArr.push(eslintDepStr);
  prettierDepStr && installDevCliArr.push(prettierDepStr);
  commitlintDepStr && installDevCliArr.push(commitlintDepStr);
  stylelintDepStr && installDevCliArr.push(stylelintDepStr);
  serverDepStr && installDevCliArr.push(serverDepStr);
  customDepStr && installDevCliArr.push(customDepStr);
  const installDevCli = `${installDevCliPrefix} ${installDevCliArr.join(' ')}`;
  logTime('DEPENDENCY(依赖解析)', true);

  // 项目依赖安装
  if (install) {
    logTime('INSTALL(安装依赖)');
    exec([
      installCli,
      installDevCli
    ], res => {
      logTime('INSTALL(安装依赖)', true);
      success(res);
    }, error, isSlient);
  } else {
    logTime('STATIC(生成静态依赖文件)');
    const processDepStr = (str: string, prefix: string) => {
      if (!str) return '';
      let result = '';
      const arr = str.split(' ').filter(v => !!v);

      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (!item) continue;
        const lastInd = item.lastIndexOf('@');
        const name = lastInd === 0 ? item : item.substr(0, lastInd);
        const version = lastInd === 0 ? 'latest' : item.substr(lastInd + 1);
        if (i + 1 === arr.length) {
          result += `    "${name}": "${version}"`;
        } else {
          result += `    "${name}": "${version}",\n`;
        }
      }

      return `"${prefix}": {\n${result}\n  },`;
    };
    outputFile({
      file_path: path.resolve(initPath, 'package.json'),
      file_content: tpl.pkj(devDependencyMap['@types/react'])({
        ...params,
        install,
        dependencies: processDepStr(dependencies_str, 'dependencies'),
        devDependencies: processDepStr(`${defaultDepStr || ''} ${customDepStr || ''}`, 'devDependencies')
      })
    });
    logTime('STATIC(生成静态依赖文件)', true);
    success([]);
  }
}

export default $init;
