#! /bin/bash

prefix="omni-door"
projectName=$(echo ${1} | tr "[A-Z]" "[a-z]")

echo -e "\033[34m模板 ${projectName} 初始化进行中...\033[0m"
mkdir packages/${projectName}
mkdir packages/${projectName}/bin
mkdir packages/${projectName}/src
mkdir packages/${projectName}/src/readme

# generate files

# bin
echo "#! /usr/bin/env node

require('../lib/cli.js');" > packages/${projectName}/bin/${prefix}-${projectName}.js

# src - index
echo "import \$init from './init';

export { \$init } from './init';
export { \$new } from './new';
export { TPLS_ORIGIN_INITIAL, TPLS_INITIAL_FN, TPLS_INITIAL_RETURE, TPLS_ORIGIN_NEW, TPLS_NEW_FN, TPLS_NEW_RETURE } from './templates';
export { setBrand, setLogo } from '@omni-door/utils';

export default \$init;" > packages/${projectName}/src/index.ts

# src - cli
echo "import { STRATEGY, STYLE, PKJTOOL, logErr } from '@omni-door/utils';
import { parse } from 'path';
import \$init from './init';
import \$new from './new';
const args = process.argv.slice(2);

type Option = {
  [key: string]: string | boolean | Function;
};

if (args.length > 0) {
  if (args[0] === 'new' && args[1]) {
    // new template
    const options = {
      ts: true,
      test: false,
      componentName: 'Omni',
      stylesheet: 'scss' as STYLE,
      newPath: process.cwd(),
      type: 'fc' as 'fc'
    };
    for (let i = 1; i < args.length; i++) {
      const item = args[i];
      const [ k, val ] = item.split('=');
      (options as Option)[k] = val === 'true'
        ? true
        : val === 'false'
          ? false
          : val;
    }
    try {
      \$new(options);
    } catch (err) {
      logErr(err);
      process.exit(1);
    }
  } else if (args[0] === 'init') {
    const options = {
      strategy: 'stable' as STRATEGY,
      projectName: parse(process.cwd()).name,
      initPath: process.cwd(),
      ts: true,
      test: false,
      eslint: true,
      prettier: true,
      commitlint: false,
      style: 'scss' as STYLE,
      stylelint: true,
      install: true,
      pkgtool: 'yarn' as PKJTOOL
    };
    for (let i = 0; i < args.length; i++) {
      const item = args[i];
      const [ k, val ] = item.split('=');
      (options as Option)[k] = val === 'true'
        ? true
        : val === 'false'
          ? false
          : val;
    }
    try {
      \$init(options);
    } catch (err) {
      logErr(err);
      process.exit(1);
    }
  }
}" > packages/${projectName}/src/cli.ts

# src - init
echo "import path from 'path';
import {
  arr2str,
  intersection,
  PKJTOOL,
  STYLE,
  STRATEGY,
  logWarn,
  logErr,
  logSuc,
  logTime,
  exec,
  output_file,
} from '@omni-door/utils';
import {
  TPLS_INITIAL,
  TPLS_ORIGIN_INITIAL,
  TPLS_INITIAL_FN,
  TPLS_INITIAL_RETURE,
  tpls_init,
  tpls_origin_init
} from './templates';
import { dependencies, devDependencies } from './configs/dependencies';
import { devDependencies as devDependencyMap } from './configs/dependencies_stable_map';

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

export async function \$init ({
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
  // 模板解析
  logTime('模板解析');
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
            logWarn(`自定义模板 [\${name}] 解析出错，将使用默认模板进行初始化！(The custom template [\${name}] parsing occured error, the default template will be used \\for initialization!)`);
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
  logTime('模板解析', true);

  // 生成项目文件
  logTime('生成文件');
  const params = { project_type, project_name, ts, test, eslint, prettier, commitlint, style, stylelint, strategy, configFileName };
  const suffix_stylesheet = style && style === 'all' ? 'scss' : style;
  const pathToFileContentMap = {
    // package.json
    'package.json': install && tpl.pkj({ ...params, install, dependencies: '', devDependencies: '' }),
    // ReadMe
    'README.md': tpl.readme(params)
  };
  const file_path = (p: string) => path.resolve(initPath, p);
  for (const p in pathToFileContentMap) {
    output_file({
      file_path: file_path(p),
      file_content: pathToFileContentMap[p]
    });
  }
  logTime('生成文件', true);

  // 项目依赖解析
  logTime('依赖解析');
  let installCliPrefix = pkgtool === 'yarn' ? `\${pkgtool} add --cwd \${initPath}` : `\${pkgtool} install --save --prefix \${initPath}`;
  let installDevCliPrefix = pkgtool === 'yarn' ? `\${pkgtool} add -D --cwd \${initPath}` : `\${pkgtool} install --save-dev --prefix \${initPath}`;
  if (pkgtool === 'cnpm' && initPath !== process.cwd()) {
    installCliPrefix = `cd \${initPath} && \${installCliPrefix}`;
    installDevCliPrefix = `cd \${initPath} && \${installDevCliPrefix}`;
  }

  let {
    depArr,
    depStr
  } = dependencies(strategy);
  let dependencies_str = depStr;
  if (typeof dependencies_custom === 'function') {
    const result = dependencies_custom(depArr);
    if (result instanceof Array) {
      dependencies_str = `\${depStr} \${arr2str(result)}`;
    } else {
      const { add = [], remove = [] } = result;
      for (let i = 0; i < remove.length; i++) {
        const item_rm = remove[i];
        depArr = [ ...intersection(depArr, depArr.filter(v => v !== item_rm)) ];
      }
      dependencies_str = `\${arr2str(depArr)} \${arr2str(add)}`;
    }
  }

  const installCli = dependencies_str ? `\${installCliPrefix} \${dependencies_str}` : '';
  let {
    defaultDepArr,
    defaultDepStr
  } = devDependencies(strategy, {
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
    }
  }

  const installDevCli = defaultDepStr ? `\${installDevCliPrefix} \${defaultDepStr}` : '';
  const installCustomDevCli = customDepStr ? `\${installDevCliPrefix} \${customDepStr}` : '';
  logTime('依赖解析', true);

  // 项目依赖安装
  if (install) {
    logTime('安装依赖');
    exec([
      installCli,
      installDevCli,
      installCustomDevCli
    ], res => {
      logTime('安装依赖', true);
      success(res);
    }, error, isSlient);
  } else {
    logTime('生成静态依赖文件');
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
          result += `    "\${name}": "\${version}"`;
        } else {
          result += `    "\${name}": "\${version}",\n`;
        }
      }

      return `"\${prefix}": {\n\${result}\n  },`;
    };
    output_file({
      file_path: path.resolve(initPath, 'package.json'),
      file_content: tpl.pkj({
        ...params,
        install,
        dependencies: processDepStr(dependencies_str, 'dependencies'),
        devDependencies: processDepStr(`\${defaultDepStr || ''} \${customDepStr || ''}`, 'devDependencies')
      })
    });
    logTime('生成静态依赖文件', true);
    success([]);
  }
}

export default \$init;" > packages/${projectName}/src/init.ts

# src - new
echo "import path from 'path';
import {
  STYLE,
  MARKDOWN,
  logInfo,
  logWarn,
  logTime,
  output_file,
} from '@omni-door/utils';
import {
  TPLS_ORIGIN_NEW,
  TPLS_NEW_FN,
  TPLS_NEW_RETURE,
  tpls_new,
  tpls_origin_new
} from './templates';

export function \$new ({
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
  md?: MARKDOWN;
  type: 'fc' | 'cc';
  tpls?: (tpls: TPLS_ORIGIN_NEW) => TPLS_NEW_RETURE;
}) {
  logTime('创建组件');
  logInfo(`开始创建 \${componentName} \${type === 'cc' ? '类' : '函数'}组件 (Start create \${componentName} \${type === 'cc' ? 'class' : 'functional'} component)`);
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
          logWarn(`自定义模板 [\${name}] 解析出错，将使用默认模板进行创建组件！(The custom template [\${name}] parsing occured error, the default template will be used \\for initialization!)`);    
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
  if (md === 'mdx') logInfo('暂不支持 mdx 文档格式，使用 md 代替！(Not support mdx format replace to md format!)');

  // component tpl
  const content_readme = md && tpl.component_readme(params);

  const pathToFileContentMap = {
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
  logTime('创建组件', true);
}

export default \$new;" > packages/${projectName}/src/new.ts

# finish echo
echo -e "\033[32m \n模板 ${projectName} 初始化成功！\033[0m"