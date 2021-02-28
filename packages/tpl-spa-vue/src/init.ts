import path from 'path';
import {
  arr2str,
  intersection,
  logWarn,
  logErr,
  logSuc,
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
  PKJTOOL,
  STYLE,
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
  stylelint: boolean;
  install: boolean;
  pkgtool?: PKJTOOL;
  isSlient?: boolean;
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
  pkgtool = 'yarn',
  isSlient,
  dependencies: dependencies_custom,
  devDependencies: devDependencies_custom,
  error = () => {
    logErr('项目安装失败！(The project installation has been occured some error!)');
    process.exit(1);
  },
  success = () => logSuc('项目安装完成！(The project installation has been completed!)')
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
  const params = { project_type, project_name, ts, test, eslint, prettier, commitlint, style, stylelint: !!style && stylelint, strategy, configFileName };
  const suffix_stylesheet = style && style === 'all' ? 'scss' : style;
  try {
    const pathToFileContentMap = {
      // package.json
      'package.json': install && tpl.pkj({ ...params, install, dependencies: '', devDependencies: '' }),
      // ReadMe
      'README.md': tpl.readme({ ...params, install: installReadMe, runScript, paramScript }),
      // lint files
      '.vscode/settings.json': tpl.vscode(params)
    };
    const file_path = (p: string) => path.resolve(initPath, p);
    for (const p in pathToFileContentMap) {
      outputFile({
        file_path: file_path(p),
        file_content: pathToFileContentMap[p as keyof typeof pathToFileContentMap]
      });
    }
  } catch (err) {
    logErr(`${err.name}: ${err.message} at \n${err.stack}`);
    error ? error(err) : process.exit(1);
  }
  logTime('生成文件(create files)', true);

  // 项目依赖解析
  logTime('依赖解析(dependency resolution)');
  let {
    depArr,
    depStr
  } = await dependencies(strategy);
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
    devDepArr
  } = await devDependencies(strategy, {
    ts,
    eslint,
    prettier,
    commitlint,
    style,
    stylelint,
    test
  });

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
      }
      defaultDepStr = arr2str(defaultDepArr);
      customDepStr = arr2str(add);
    }
  }

  const installDevCli = defaultDepStr ? `${installDevCliPrefix} ${defaultDepStr}` : '';
  const installCustomDevCli = customDepStr ? `${installDevCliPrefix} ${customDepStr}` : '';
  logTime('依赖解析(dependency resolution)', true);

  // 项目依赖安装
  if (install) {
    logTime('安装依赖(install dependency)');
    exec([
      installCli,
      installDevCli,
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
    outputFile({
      file_path: path.resolve(initPath, 'package.json'),
      file_content: tpl.pkj({
        ...params,
        install,
        dependencies: processDepStr(dependencies_str, 'dependencies'),
        devDependencies: processDepStr(`${defaultDepStr || ''} ${customDepStr || ''}`, 'devDependencies')
      })
    });
    logTime('生成静态依赖文件(generate static dependency)', true);
    success([]);
  }
}

export default $init;
