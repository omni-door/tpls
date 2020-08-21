#! /bin/bash

prefix="omni-door"
projectName=$(echo ${1} | tr "[A-Z]" "[a-z]")
dirName="packages/tpl-${projectName}"

mkdir ${dirName}
mkdir ${dirName}/bin
mkdir ${dirName}/src
mkdir ${dirName}/src/configs
mkdir ${dirName}/src/configs/__test__
mkdir ${dirName}/src/templates
mkdir ${dirName}/src/templates/__test__
mkdir ${dirName}/src/templates/readme
mkdir ${dirName}/src/templates/omni
mkdir ${dirName}/src/templates/package
mkdir ${dirName}/src/templates/vsc
mkdir ${dirName}/src/templates/new

# generate files

# bin
echo "#! /usr/bin/env node

require('../lib/cli.js');" > ${dirName}/bin/${prefix}-${projectName}.js


# src - index
echo "import \$init from './init';

export { \$init } from './init';
export { \$new } from './new';
export { setBrand, setLogo } from '@omni-door/utils';
export type { TPLS_ORIGIN_INITIAL, TPLS_INITIAL_FN, TPLS_INITIAL_RETURE, TPLS_ORIGIN_NEW, TPLS_NEW_FN, TPLS_NEW_RETURE } from './templates';

export default \$init;" > ${dirName}/src/index.ts


# src - cli
echo "import { logErr } from '@omni-door/utils';
import { parse } from 'path';
import \$init from './init';
import \$new from './new';
import type { STRATEGY, STYLE, PKJTOOL } from '@omni-door/utils';
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
}" > ${dirName}/src/cli.ts


# src - init
echo "import path from 'path';
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
            logWarn(\`自定义模板 [\${name}] 解析出错，将使用默认模板进行初始化！(The custom template [\${name}] parsing occured error, the default template will be used for initialization!)\`);
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
    'README.md': tpl.readme(params),
    // lint files
    '.vscode/settings.json': tpl.vscode(params)
  };
  const file_path = (p: string) => path.resolve(initPath, p);
  for (const p in pathToFileContentMap) {
    output_file({
      file_path: file_path(p),
      file_content: pathToFileContentMap[p as keyof typeof pathToFileContentMap]
    });
  }
  logTime('生成文件', true);

  // 项目依赖解析
  logTime('依赖解析');
  let installCliPrefix = pkgtool === 'yarn' ? \`\${pkgtool} add --cwd \${initPath}\` : \`\${pkgtool} install --save --save-exact --prefix \${initPath}\`;
  let installDevCliPrefix = pkgtool === 'yarn' ? \`\${pkgtool} add -D --cwd \${initPath}\` : \`\${pkgtool} install --save-dev --save-exact --prefix \${initPath}\`;
  if (pkgtool === 'cnpm' && initPath !== process.cwd()) {
    installCliPrefix = \`cd \${initPath} && \${installCliPrefix}\`;
    installDevCliPrefix = \`cd \${initPath} && \${installDevCliPrefix}\`;
  }

  let {
    depArr,
    depStr
  } = dependencies(strategy);
  let dependencies_str = depStr;
  if (typeof dependencies_custom === 'function') {
    const result = dependencies_custom(depArr);
    if (result instanceof Array) {
      dependencies_str = \`\${depStr} \${arr2str(result)}\`;
    } else {
      const { add = [], remove = [] } = result;
      for (let i = 0; i < remove.length; i++) {
        const item_rm = remove[i];
        depArr = [ ...intersection(depArr, depArr.filter(v => v !== item_rm)) ];
      }
      dependencies_str = \`\${arr2str(depArr)} \${arr2str(add)}\`;
    }
  }

  const installCli = dependencies_str ? \`\${installCliPrefix} \${dependencies_str}\` : '';
  let {
    defaultDepArr,
    defaultDepStr,
    devDepArr
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

  const installDevCli = defaultDepStr ? \`\${installDevCliPrefix} \${defaultDepStr}\` : '';
  const installCustomDevCli = customDepStr ? \`\${installDevCliPrefix} \${customDepStr}\` : '';
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
          result += \`    \"\${name}\": \"\${version}\"\`;
        } else {
          result += \`    \"\${name}\": \"\${version}\",\n\`;
        }
      }

      return \`\"\${prefix}\": {\n\${result}\n  },\`;
    };
    output_file({
      file_path: path.resolve(initPath, 'package.json'),
      file_content: tpl.pkj({
        ...params,
        install,
        dependencies: processDepStr(dependencies_str, 'dependencies'),
        devDependencies: processDepStr(\`\${defaultDepStr || ''} \${customDepStr || ''}\`, 'devDependencies')
      })
    });
    logTime('生成静态依赖文件', true);
    success([]);
  }
}

export default \$init;" > ${dirName}/src/init.ts


# src - new
echo "import path from 'path';
import {
  logInfo,
  logWarn,
  logTime,
  output_file,
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
  logInfo(\`开始创建 \${componentName} \${type === 'cc' ? '类' : '函数'}组件 \(Start create \${componentName} \${type === 'cc' ? 'class' : 'functional'} component\)\`);
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
          logWarn(\`自定义模板 [\${name}] 解析出错，将使用默认模板进行创建组件！(The custom template [\${name}] parsing occured error, the default template will be used for initialization!)\`);    
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
      file_content: pathToFileContentMap[p as keyof typeof pathToFileContentMap]
    });
  }
  logTime('创建组件', true);
}

export default \$new;" > ${dirName}/src/new.ts


# src - config - dependencies_stable_map
echo "export const dependencies = {};

export const devDependencies = {
  'del': '5.1.0',
  '@omni-door/cli': 'latest'
};" > ${dirName}/src/configs/dependencies_stable_map.ts


# src - config - dependencies
echo "import { getDependency, arr2str } from '@omni-door/utils';
import { dependencies as dependenciesMap, devDependencies as devDependenciesMap } from './dependencies_stable_map';
import type { STYLE, STRATEGY } from '@omni-door/utils';

interface Config {
  ts: boolean;
  test: boolean;
  eslint: boolean;
  prettier: boolean;
  commitlint: boolean;
  style: STYLE;
  stylelint: boolean;
}

export function dependencies (strategy: STRATEGY) {
  const dependency = getDependency(strategy, dependenciesMap);
  const deps = [''];
  return {
    depArr: [ ...deps ],
    depStr: arr2str(deps)
  };
}

export function devDependencies (strategy: STRATEGY, config: Config) {
  const dependency = getDependency(strategy, devDependenciesMap);

  const {
    ts,
    test,
    eslint,
    prettier,
    commitlint,
    style,
    stylelint
  } = config;

  const defaultDep = [
    dependency('@omni-door/cli'),
    dependency('del')
  ];

  return {
    devDepArr: [
      ...defaultDep
    ],
    defaultDepArr: defaultDep,
    defaultDepStr: arr2str(defaultDep)
  };
}" > ${dirName}/src/configs/dependencies.ts


# src - config - __test__
echo "import { expect } from 'chai';
import { dependencies as dependencies_stable, devDependencies as devDependencies_stable } from '../dependencies_stable_map';
import { dependencies, devDependencies } from '../dependencies';

describe('[tpl-${projectName}]: dependencies_stable_map test', function () {
  it('type checking', function () {
    expect(dependencies_stable).to.be.an('object');
    expect(devDependencies_stable).to.be.an('object');
  });
});

describe('[tpl-${projectName}]: dependencies test', function () {
  it('type checking', function () {
    expect(dependencies).to.be.a('function');
    expect(devDependencies).to.be.a('function');
  });
});" > ${dirName}/src/configs/__test__/index.test.ts


# src - templates - package
echo 'import { tpl_engine_init } from "@omni-door/utils";

const tpl = 
`\`{
  "name": "\${project_name.toLowerCase()}",
  "version": "0.0.1",
  "description": "",
  "scripts": {
    "start": "omni dev",
    "dev": "omni dev",
    "new": "omni new",
    "build": "omni build",
    "release": "omni release"
  },
  "keywords": [],
  "author": "",
  \${\!install \? dependencies \: ''}
  \${\!install \? devDependencies \: ''}
  "omni": {
    "filePath": "./configs/omni.config.js"
  },
  "license": "ISC"
}
\``;

export const tpl_package = {
  tpl
};

export default tpl_engine_init(tpl_package, "tpl");' > ${dirName}/src/templates/package/index.ts


# src - templates - omni
echo "import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
\`\\\`\\\${use_strict}

const path = require('path');
const merge = require('webpack-merge');

module.exports = {
  type: '\\\${project_type}', // 项目类型，请勿任意变动 (project type, please don't modify)

  dev: {
    port: 6200, // 开发服务端口号 (dev-server port)
    // host: 'dev.domain.com', // 开发服务端host (dev-server host)
    // https: true, // 以https协议启动开发服务 (start dev-server with https)
  },

  build: {
    // 构建完成后是否自动发布 (auto release project after build success)
    autoRelease: false,

    // 输入路径 (the build source directory)
    // 务必使用绝对路径 (must be a absolute path)
    srcDir: path.resolve(__dirname, '../src'),

    // 输出路径 (the directory for compiled project)
    // 务必使用绝对路径 (must be a absolute path)
    outDir: path.resolve(__dirname, '../dist'),

    // 构建的资源是否加上hash，可选 'hash'、'contenthash'、'chunkhash' (whether the hash tag add to building result)
    hash: true,

    // 构建阶段的自定义配置回调 (The callback will be call in the build-process)
    // 返回自定义的配置 (You can return your custom build configuration)
    configuration: config => merge(config, require(path.resolve(__dirname, 'webpack.config.prod.js'))),

    reserve: {
      assets: [] // 构建结果保留其他资源的路径 (reserve other asset paths)
    },

    preflight: {
      typescript: \\\${!!ts}, // 构建时是否处理ts或tsx文件 (whether or not process the ts or tsx files)
      test: \\\${!!test}, // 构建时是否进行单元测试 (whether or not process unit-test)
      eslint: \\\${!!eslint}, // 构建时是否进行eslint检测 (whether or not process eslint checking)
      prettier: \\\${!!prettier}, // 构建时是否进行prettier检测 (whether or not process prettier checking)
      stylelint: \\\${!!stylelint}, // 构建时是否进行stylelint检测 (whether or not process stylelint checking)
    }
  },

  release: {
    git: '\\\${git}', // 发布的git仓库地址 (project git repo url)
    preflight: {
      test: \\\${!!test}, // 发布前是否进行单元测试 (whether or not process unit-test)
      eslint: \\\${!!eslint}, // 发布前是否进行eslint检测 (whether or not process eslint checking)
      prettier: \\\${!!prettier}, // 发布前是否进行prettier检测 (whether or not process prettier checking)
      stylelint: \\\${!!stylelint}, // 发布前是否进行stylelint检测 (whether or not process stylelint checking)
      commitlint: \\\${!!commitlint}, // 发布前是否进行commitlint检测 (whether or not process commitlint checking)
      branch: 'master' // 发布前进行分支检测，设置为空字符串则不会检测 (only can release in this branch, set empty string to ignore this check)
    }
  },

  template: {
    // 生成模板的根路径 (the root directory for generate template)
    // 务必使用绝对路径 (must be a absolute path)
    root: path.resolve(__dirname, '../src'),

    // 是否创建ts文件 (whether or not generate typescript)
    typescript: \\\${!!ts},

    // 是否创建单元测试文件 (whether or not generate unit test frame)
    test: \\\${!!test},

    // 样式文件类型 (stylesheet type)
    stylesheet: '\\\${style === 'all' ? 'scss' : style}'
  },

  plugins: []
};
\\\`\`;

export const tpl_omni = {
  tpl
};

export default tpl_engine_init(tpl_omni, 'tpl');" > ${dirName}/src/templates/omni/index.ts

# src - templates - readme
echo "import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
\`\\\`# \\\${project_name}

## 启动项目 (Run project)

\\\\\\\`\\\\\\\`\\\\\\\`shell
npm start
\\\\\\\`\\\\\\\`\\\\\\\`
or
\\\\\\\`\\\\\\\`\\\\\\\`shell
npm run dev
\\\\\\\`\\\\\\\`\\\\\\\`

## 新建组件 (Create a Component)

\\\\\\\`\\\\\\\`\\\\\\\`shell
npm run new
\\\\\\\`\\\\\\\`\\\\\\\`

### 新建一个名为Button的函数组件 (Create a functional Component which name is Button)
\\\\\\\`\\\\\\\`\\\\\\\`shell
npm run new Button -- -f
\\\\\\\`\\\\\\\`\\\\\\\`

## 构建项目 (Build project)

\\\\\\\`\\\\\\\`\\\\\\\`shell
npm run build
\\\\\\\`\\\\\\\`\\\\\\\`

### 构建项目时绕过所有检查 (Bypass all pre-check before building)
\\\\\\\`\\\\\\\`\\\\\\\`shell
npm run build -- -n
\\\\\\\`\\\\\\\`\\\\\\\`

## 发布项目 (Release project)

\\\\\\\`\\\\\\\`\\\\\\\`shell
npm run release
\\\\\\\`\\\\\\\`\\\\\\\`

### 发布项目时忽略版本迭代 (Ignoring version of iteration)
\\\\\\\`\\\\\\\`\\\\\\\`shell
npm run release -- -i
\\\\\\\`\\\\\\\`\\\\\\\`

### 发布项目时指定迭代的版本为0.3.25 (Manual specify version of iteration to 0.3.25)
\\\\\\\`\\\\\\\`\\\\\\\`shell
npm run release -- -m 0.3.25
\\\\\\\`\\\\\\\`\\\\\\\`

\#\#\# 发布项目时绕过所有检查 (Bypass all pre-check before release)
\\\\\\\`\\\\\\\`\\\\\\\`shell
npm run release -- -n
\\\\\\\`\\\\\\\`\\\\\\\`

**更多配置项请在 [\\\${configFileName}](https://github.com/omni-door/cli/blob/master/docs/OMNI.zh-CN.md) 中编辑 (More powerful customizations is in [\\\${configFileName}](https://github.com/omni-door/cli/blob/master/docs/OMNI.md))**
\\\`\`;

export const tpl_readme = {
  tpl
};

export default tpl_engine_init(tpl_readme, 'tpl');" > ${dirName}/src/templates/readme/index.ts

# src - templates - vsc
echo 'import { tpl_engine_init } from "@omni-door/utils";

const tpl = 
`\`{
  "editor.tabSize": 2,
  "editor.formatOnSave": \${eslint ? false : true},
  "javascript.format.enable": \${eslint ? false : true},
  "[css]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[less]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[scss]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[sass]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[javascript]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[typescript]": {
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": \${eslint ? true : false}
  },
  "files.exclude": {
    "**/.vscode": true,
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/.editorconfig": true,
    "**/.eslintignore": true,
    "**/.prettierignore": true
  }
}
\``;

export const tpl_vscode_setting = {
  tpl
};

export default tpl_engine_init(tpl_vscode_setting, "tpl");' > ${dirName}/src/templates/vsc/index.ts

# src - templates - new - readme
echo "import { tpl_engine_new } from '@omni-door/utils';

const tpl = 
\`\\\`# \\\${componentName}

## Example

\\\\\\\`\\\\\\\`\\\\\\\`\\\${ts ? 'tsx' : 'jsx'}
import { \\\${componentName} } from './\\\${componentName}';

<\\\${componentName} />
\\\\\\\`\\\\\\\`\\\\\\\`
\\\`\`;

export const tpl_new_readme = {
  tpl
};

export default tpl_engine_new(tpl_new_readme, 'tpl');" > ${dirName}/src/templates/new/readme.ts

# src - templates - __test__
echo "import { expect } from 'chai';
import tpl_index from '../index';
import tpl_omni from '../omni';
import tpl_package from '../package';
import tpl_readme from '../readme';
import tpl_vscode from '../vsc';
import component_readme from '../new/readme';

describe('[tpl-${projectName}]: tpl_index template test', function () {
  it('type checking', function () {
    expect(tpl_index).to.be.a('object');
  });
});

describe('[tpl-${projectName}]: tpl_omni template test', function () {
  it('type checking', function () {
    expect(tpl_omni).to.be.a('function');
  });
});

describe('[tpl-${projectName}]: tpl_package template test', function () {
  it('type checking', function () {
    expect(tpl_package).to.be.a('function');
  });
});

describe('[tpl-${projectName}]: tpl_readme template test', function () {
  it('type checking', function () {
    expect(tpl_readme).to.be.a('function');
  });
});

describe('[tpl-${projectName}]: tpl_vscode template test', function () {
  it('type checking', function () {
    expect(tpl_vscode).to.be.a('function');
  });
});

describe('[tpl-${projectName}]: component_readme template test', function () {
  it('type checking', function () {
    expect(component_readme).to.be.a('function');
  });
});" > ${dirName}/src/templates/__test__/index.test.ts


# src - templates - index
echo "import omni, { tpl_omni } from './omni';
import pkj, { tpl_package } from './package';
import readme, { tpl_readme } from './readme';
import vscode, { tpl_vscode_setting } from './vsc';
import component_readme, { tpl_new_readme } from './new/readme';

export { default as omni, tpl_omni } from './omni';
export { default as pkj, tpl_package } from './package';
export { default as readme, tpl_readme } from './readme';
export { default as component_readme, tpl_new_readme } from './new/readme';

/* -- templates - init --  */
export const tpls_init = {
  omni,
  pkj,
  readme,
  vscode
};

export const tpls_origin_init = {
  tpl_omni,
  tpl_package,
  tpl_readme,
  tpl_vscode_setting
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

export default { ...tpls_init, ...tpls_new };" > ${dirName}/src/templates/index.ts


# .npmignore
echo '.DS_Store
.build
src
docs

.eslintignore
.eslintrc.js
tsconfig.json
*.config.js
*.conf.js
.gitignore

test
__test__

_config.yml
.nyc_output
.travis.yml
coverage
.nycrc
mocha.opts

yarn.lock
package-lock.json
*.log' > ${dirName}/.npmignore


# LICENSE
echo 'MIT License

Copyright (c) 2020 omni-door 任意门

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
' > ${dirName}/LICENSE


# package.json
upperName=$(echo ${projectName} | tr "[a-z]" "[A-Z]")
echo "{
  \"name\": \"@omni-door/tpl-${projectName}\",
  \"version\": \"0.0.1\",
  \"description\": \"\",
  \"bin\": {
    \"omni-${projectName}\": \"./bin/${prefix}-${projectName}.js\"
  },
  \"keywords\": [
    \"template\",
    \"omni\",
    \"omni-door\"
  ],
  \"author\": \"bobby.li <bobby.lhan@gmail.com>\",
  \"homepage\": \"https://github.com/omni-door/tpls/tree/master/${dirName}#readme\",
  \"license\": \"MIT\",
  \"main\": \"lib/index.js\",
  \"directories\": {
    \"lib\": \"lib\",
    \"test\": \"src/**/__tests__\"
  },
  \"files\": [
    \"lib\"
  ],
  \"publishConfig\": {
    \"access\": \"public\"
  },
  \"repository\": {
    \"type\": \"git\",
    \"url\": \"git+https://github.com/omni-door/tpls.git\"
  },
  \"scripts\": {
    \"test\": \"nyc mocha --opts mocha.opts\",
    \"lint\": \"eslint src/ --ext .ts --ext .tsx\",
    \"lint:fix\": \"eslint src/ --ext .ts --ext .tsx --fix\",
    \"build\": \"npm run build:rm && npm run build:tsc\",
    \"build:rm\": \"rm -rf lib/*\",
    \"build:tsc\": \"tsc --build\",
    \"build:branch\": \"../../scripts/branch.sh\",
    \"build:version\": \"../../scripts/version.sh\",
    \"release\": \"npm run build:branch master TPL-${upperName} && npm run build && npm run build:version TPL-${upperName}\",
    \"upgrade:utils\": \"yarn upgrade @omni-door/utils@latest\"
  },
  \"bugs\": {
    \"url\": \"https://github.com/omni-door/tpls/issues\"
  }
}
" > ${dirName}/package.json


# README.md
echo "# 🐸 @${prefix}/tpl-${projectName}
The ${projectName} project template

[![NPM downloads](http://img.shields.io/npm/dm/%40omni-door%2Ftpl-${projectName}.svg?style=flat-square)](https://www.npmjs.com/package/@omni-door/tpl-${projectName})
[![npm version](https://badge.fury.io/js/%40omni-door%2Ftpl-${projectName}.svg)](https://badge.fury.io/js/%40omni-door%2Ftpl-${projectName})
[![install size](https://packagephobia.now.sh/badge?p=%40omni-door%2Ftpl-${projectName})](https://packagephobia.now.sh/result?p=%40omni-door%2Ftpl-${projectName})
[![license](http://img.shields.io/npm/l/%40omni-door%2Ftpl-${projectName}.svg)](https://github.com/omni-door/tpls/blob/master/packages/tpl-${projectName}/LICENSE)

## Install
* Clone the repo: \`git@github.com:omni-door/tpls.git\`

* Install with [Npm](https://www.npmjs.com/package/@omni-door/tpl-${projectName}): \`npm install @omni-door/tpl-${projectName}\`

* Install with [Yarn](https://yarnpkg.com/en/package/@omni-door/tpl-${projectName}): \`yarn add @omni-door/tpl-${projectName}\`

## Templates
| folder | file |
| --- | --- |
| new | the standard templates for \`omni new\` command |
| omni | omni.config.js |
| package | package.json |
| readme | README.md |" > ${dirName}/README.md


# tsconfig.json
echo '{
  "compilerOptions": {
    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    // "lib": [],                             /* Specify library files to be included in the compilation. */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    "outDir": "./lib",                        /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
  },
  "exclude": [
    "node_modules",
    "src/**/__test__/*",
    "lib/*",
    "../../../node_modules"
  ]
}
' > ${dirName}/tsconfig.json

yarn add @omni-door/utils --cwd ${dirName} --registry="https://registry.npmjs.org/"

yarn add -D typescript@~3.9.7 --cwd ${dirName} --registry="https://registry.npmjs.org/"
