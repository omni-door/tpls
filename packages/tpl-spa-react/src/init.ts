import path from 'path';
import {
  arr2str,
  intersection,
  logWarn,
  logErr,
  logSuc,
  logTime,
  exec,
  output_file,
} from '@omni-door/utils';
import {
  tpls_init,
  tpls_origin_init
} from './templates';
import { dependencies, devDependencies } from './configs/dependencies';
import { devDependencies as devDependencyMap } from './configs/dependencies_stable_map';
/* import types */
import type {
  PKJTOOL,
  STYLE,
  LAYOUT,
  STRATEGY
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
  layout?: LAYOUT;
  stylelint: boolean;
  install: boolean;
  pkgtool?: PKJTOOL;
  isSlient?: boolean;
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
  layout = 'px',
  stylelint,
  install,
  tpls,
  pkgtool = 'pnpm',
  isSlient,
  tag,
  dependencies: dependencies_custom,
  devDependencies: devDependencies_custom,
  error = () => {
    logErr('单页应用项目安装失败！(The single-page-application project installation has been occured some error!)');
    process.exit(1);
  },
  success = () => logSuc('单页应用项目安装完成！(The single-page-application project installation has been completed!)')
}: InitOptions) {
  let installCliPrefix, installDevCliPrefix, installReadMe, runScript;
  switch (pkgtool) {
    case 'pnpm':
      installCliPrefix = `${pkgtool} add -P --save-exact --prefix ${initPath}`;
      installDevCliPrefix = `${pkgtool} add -D --save-exact --prefix ${initPath}`;
      installReadMe = `${pkgtool} install`;
      runScript = `${pkgtool}`;
      break;
    case 'yarn':
      installCliPrefix = `${pkgtool} add --cwd ${initPath}`;
      installDevCliPrefix = `${pkgtool} add -D --cwd ${initPath}`;
      installReadMe = `${pkgtool}`;
      runScript = `${pkgtool}`;
      break;
    case 'npm':
    default:
      installCliPrefix = `${pkgtool} install --save --save-exact --prefix ${initPath}`;
      installDevCliPrefix = `${pkgtool} install --save-dev --save-exact --prefix ${initPath}`;
      installReadMe = `${pkgtool} install`;
      runScript = `${pkgtool} run`;
  }

  // 模板解析
  logTime('模板解析(template parsing)');
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
            logWarn(err);
            logWarn(`自定义模板 [${name}] 解析出错，将使用默认模板进行初始化！(The custom template [${name}] parsing occured error, the default template will be used for initialization!)`);
            return originTpl(config);
          }
        };
      };
      (list[name] as TPLS_INITIAL_FN) = tplFactory(list[name], tpls_init[name]) as TPLS_INITIAL_FN;
    }
  } catch (err_tpls) {
    logWarn(err_tpls);
    logWarn('生成自定义模板出错，将全部使用默认模板进行初始化！(The custom template generating occured error, all will be initializated with the default template!)');
  }
  const tpl = { ...tpls_init, ...custom_tpl_list };
  const project_type = 'spa-react' as 'spa-react';
  logTime('模板解析(template parsing)', true);

  // 生成项目文件
  logTime('生成文件(create files)');
  const params = { project_type, project_name, ts, test, eslint, prettier, commitlint, style, layout, stylelint: !!style && stylelint, strategy, configFileName };
  try {
    const suffix_stylesheet = style && style === 'all' ? 'scss' : style;
    const pathToFileContentMap = {
      // default files
      [`configs/${configFileName}`]: tpl.omni({ ...params, git }),
      'package.json': install && tpl.pkj(devDependencyMap['@types/react'])({ ...params, install, dependencies: '', devDependencies: '' }),
      '.gitignore': tpl.gitignore(params),
      [`src/index.${ts ? 'tsx' : 'jsx'}`]: tpl.source_index_react(params),
      [`src/routes.${ts ? 'tsx' : 'jsx'}`]: tpl.source_routes(params),
      'src/index.html': tpl.source_html(params),
      // d.ts files
      'src/@types/index.d.ts': ts && tpl.source_d_i(params),
      'src/@types/global.d.ts': ts && tpl.source_d_g(params),
      [`src/index.${suffix_stylesheet}`]: style && tpl.source_index_style(params),
      [`src/reset.${suffix_stylesheet}`]: style && tpl.source_index_reset(params),
      // pages
      [`src/pages/home/index.${ts ? 'ts' : 'js'}`]: tpl.source_page_index({ ...params, pageName: 'home' }),
      [`src/pages/home/home.${ts ? 'tsx' : 'jsx'}`]: tpl.source_page_page({ ...params, pageName: 'home', content: 'Home Page' }),
      [`src/pages/home/style/home.${suffix_stylesheet}`]: style && tpl.source_page_style({ ...params, pageName: 'home' }),
      [`src/pages/detail/index.${ts ? 'ts' : 'js'}`]: tpl.source_page_index({ ...params, pageName: 'detail' }),
      [`src/pages/detail/detail.${ts ? 'tsx' : 'jsx'}`]: tpl.source_page_page_nest({ ...params, pageName: 'detail', content: 'Detail Page' }),
      [`src/pages/detail/style/detail.${suffix_stylesheet}`]: style && tpl.source_page_style({ ...params, pageName: 'detail' }),
      // components
      [`src/components/Detail/index.${ts ? 'ts' : 'js'}`]: tpl.source_component_index({ ...params, componentName: 'Detail' }),
      [`src/components/Detail/Detail.${ts ? 'tsx' : 'jsx'}`]: tpl.source_component_cp({ ...params, componentName: 'Detail' }),
      [`src/components/Detail/style/Detail.${suffix_stylesheet}`]: style && tpl.source_component_style({ ...params, componentName: 'Detail' }),
      [`src/components/Detail/__test__/index.test.${
        ts
          ? 'tsx'
          : 'jsx'
      }`]: test && tpl.source_component_test({ ...params, componentName: 'Detail' }),
      // config files
      'configs/webpack.config.common.js': tpl.webpack_config_common(params),
      'configs/webpack.config.dev.js': tpl.webpack_config_dev(params),
      'configs/webpack.config.prod.js': tpl.webpack_config_prod(params),
      'tsconfig.json': ts && tpl.tsconfig(params), // tsconfig
      'configs/jest.config.js': test && tpl.jest(params), // test files
      'configs/postcss.config.js': style && tpl.postcss(params),
      // lint files
      '.vscode/settings.json': tpl.vscode(params),
      '.editorconfig': (eslint || prettier) && tpl.editor(params),
      'configs/.eslintrc.js': eslint && tpl.eslint(params),
      '.eslintignore': eslint && tpl.eslintignore(params),
      'configs/prettier.config.js': prettier && tpl.prettier(params),
      '.prettierignore': prettier && tpl.prettierignore(params),
      'configs/stylelint.config.js': stylelint && tpl.stylelint(params),
      'configs/commitlint.config.js': commitlint && tpl.commitlint(params),
      'configs/babel.config.js': tpl.babel(params), // build files
      'README.md': tpl.readme({ ...params, install: installReadMe, runScript }) // ReadMe
    };
    const file_path = (p: string) => path.resolve(initPath, p);
    for (const p in pathToFileContentMap) {
      output_file({
        file_path: file_path(p),
        file_content: pathToFileContentMap[p]
      });
    }
  } catch (err) {
    logErr(`${err.name}: ${err.message} at \n${err.stack}`);
    error ? error(err) : process.exit(1);
  }
  logTime('生成文件(create files)', true);

  // 项目依赖解析
  logTime('依赖解析(dependency resolution)');
  const dependenciesOptions = {
    ts,
    eslint,
    prettier,
    commitlint,
    style,
    layout,
    stylelint,
    test,
    tag
  };

  let {
    depArr,
    depStr
  } = dependencies(strategy, dependenciesOptions);
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
    buildDepArr,
    buildDepStr,
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
    devServerDepArr,
    devServerDepStr,
    devDepArr
  } = devDependencies(strategy, dependenciesOptions);

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
        buildDepArr = [ ...intersection(buildDepArr, buildDepArr.filter(v => v !== item_rm)) ];
        tsDepArr = [ ...intersection(tsDepArr, tsDepArr.filter(v => v !== item_rm)) ];
        testDepArr = [ ...intersection(testDepArr, testDepArr.filter(v => v !== item_rm)) ];
        eslintDepArr = [ ...intersection(eslintDepArr, eslintDepArr.filter(v => v !== item_rm)) ];
        prettierDepArr = [ ...intersection(prettierDepArr, prettierDepArr.filter(v => v !== item_rm)) ];
        commitlintDepArr = [ ...intersection(commitlintDepArr, commitlintDepArr.filter(v => v !== item_rm)) ];
        stylelintDepArr = [ ...intersection(stylelintDepArr, stylelintDepArr.filter(v => v !== item_rm)) ];
        devServerDepArr = [ ...intersection(devServerDepArr, devServerDepArr.filter(v => v !== item_rm)) ];
      }
      defaultDepStr = arr2str(defaultDepArr);
      buildDepStr = arr2str(buildDepArr);
      tsDepStr = arr2str(tsDepArr);
      testDepStr = arr2str(testDepArr);
      eslintDepStr = arr2str(eslintDepArr);
      prettierDepStr = arr2str(prettierDepArr);
      commitlintDepStr = arr2str(commitlintDepArr);
      stylelintDepStr = arr2str(stylelintDepArr);
      devServerDepStr = arr2str(devServerDepArr);
      customDepStr = arr2str(add);
    }
  }

  const installDevCli = defaultDepStr ? `${installDevCliPrefix} ${defaultDepStr}` : '';
  const installBuildDevCli = buildDepStr ? `${installDevCliPrefix} ${buildDepStr}` : '';
  const installTsDevCli = tsDepStr ? `${installDevCliPrefix} ${tsDepStr}` : '';
  const installTestDevCli = testDepStr ? `${installDevCliPrefix} ${testDepStr}` : '';
  const installEslintDevCli = eslintDepStr ? `${installDevCliPrefix} ${eslintDepStr}` : '';
  const installPrettierDevCli = prettierDepStr ? `${installDevCliPrefix} ${prettierDepStr}` : '';
  const installCommitlintDevCli = commitlintDepStr ? `${installDevCliPrefix} ${commitlintDepStr}` : '';
  const installStylelintDevCli = stylelintDepStr ? `${installDevCliPrefix} ${stylelintDepStr}` : '';
  const installServerDevCli = devServerDepStr ? `${installDevCliPrefix} ${devServerDepStr}` : '';
  const installCustomDevCli = customDepStr ? `${installDevCliPrefix} ${customDepStr}` : '';
  logTime('依赖解析(dependency resolution)', true);

  // 项目依赖安装
  if (install) {
    logTime('安装依赖(install dependency)');
    exec([
      installCli,
      installDevCli,
      installBuildDevCli,
      installTsDevCli,
      installTestDevCli,
      installEslintDevCli,
      installPrettierDevCli,
      installCommitlintDevCli,
      installStylelintDevCli,
      installServerDevCli,
      installCustomDevCli
    ], res => {
      logTime('安装依赖(install dependency)', true);
      success(res);
    }, error, isSlient);
  } else {
    logTime('生成静态依赖文件(generate static dependency)');
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
    output_file({
      file_path: path.resolve(initPath, 'package.json'),
      file_content: tpl.pkj(devDependencyMap['@types/react'])({
        ...params,
        install,
        dependencies: processDepStr(dependencies_str, 'dependencies'),
        devDependencies: processDepStr(`${defaultDepStr || ''} ${buildDepStr || ''} ${tsDepStr || ''} ${testDepStr || ''} ${eslintDepStr || ''} ${prettierDepStr || ''} ${commitlintDepStr || ''} ${stylelintDepStr || ''} ${devServerDepStr || ''} ${customDepStr || ''}`, 'devDependencies')
      })
    });
    logTime('生成静态依赖文件(generate static dependency)', true);
    success([]);
  }
}

export default $init;