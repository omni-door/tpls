import path from 'path';
import {
  exec,
  arr2str,
  intersection,
  outputFile,
  logErr,
  logWarn,
  logTime,
  logInfo
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
  STRATEGY,
  COMPONENTSERVER
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
  npm?: string;
  devServer: COMPONENTSERVER;
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
  npm = '',
  devServer,
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
  tag,
  dependencies: dependencies_custom,
  devDependencies: devDependencies_custom,
  error = () => process.exit(1),
  success = () => {}
}: InitOptions) {
  let installCliPrefix, installDevCliPrefix, installReadMe, runScript, paramScript;

  if (pkgtool === 'pnpm') {
    logInfo('back to yarn because the typescript cannot compatible with the soft connection of pnpm');
    logInfo('回退至 yarn，因为 typescript 暂时无法兼容 pnpm 的软连机制');
    logInfo('https://github.com/microsoft/TypeScript/issues/29221');
    pkgtool = 'yarn';
  }

  switch (pkgtool as PKJTOOL) {
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
  let custom_tpl_list = {};
  try {
    custom_tpl_list = typeof tpls === 'function'
      ? tpls(tpls_origin_init)
      : custom_tpl_list;

    for (const tpl_name in custom_tpl_list) {
      const name = tpl_name as keyof TPLS_INITIAL_RETURE;
      const list = custom_tpl_list as TPLS_INITIAL_RETURE;
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
  const project_type = 'component-react' as 'component-react';
  logTime('PARSE(模板解析)', true);

  // 生成项目文件
  logTime('CREATE(创建文件)');
  const params = { project_type, project_name, ts, test, eslint, prettier, commitlint, style, stylelint: !!style && stylelint, strategy, configFileName };
  try {
    const pathToFileContentMap = {
      // default
      [`${configFileName}`]: tpl.omni({ ...params, git, npm, devServer }),
      'package.json': install && tpl.pkj({
        type_react: devDependencyMap['@types/react'],
        project_name,
        devServer
      })({ ...params, install, dependencies: '', devDependencies: '' }),
      '.gitignore': tpl.gitignore(params),
      '.npmignore': tpl.npmignore(params),
      [`src/index.${ts ? 'ts' : 'js'}`]: tpl.source_index(params),
      [`src/utils/classnames.${ts ? 'ts' : 'js'}`]: tpl.source_classnames(params),
      // typescript
      '@types/global.d.ts': ts && tpl.source_d(params),
      'tsconfig.json': ts && tpl.tsconfig(params),
      // unit test
      'jest.config.js': test && tpl.jest(params),
      // lint
      '.vscode/settings.json': tpl.vscode(params),
      '.editorconfig': (eslint || prettier) && tpl.editor(params),
      '.eslintrc.js': eslint && tpl.eslint(params),
      '.eslintignore': eslint && tpl.eslintignore(params),
      'prettier.config.js': prettier && tpl.prettier(params),
      '.prettierignore': prettier && tpl.prettierignore(params),
      'stylelint.config.js': stylelint && tpl.stylelint(params),
      'commitlint.config.js': commitlint && tpl.commitlint(params),
      // build
      'babel.config.js': (!ts || devServer === 'storybook' || devServer === 'styleguidist') && tpl.babel(params),
      'gulpfile.js': tpl.gulpfile(params),
      // docs
      'README.md': tpl.readme({ ...params, install: installReadMe, runScript, paramScript }),
      'README.zh-CN.md': tpl.readme_cn({ ...params, install: installReadMe, runScript, paramScript }),
      'DEV.md': tpl.readme_dev({ ...params, install: installReadMe, runScript, paramScript }),
      'DEV.zh-CN.md': tpl.readme_dev_cn({ ...params, install: installReadMe, runScript, paramScript }),
      // demo
      'src/index.mdx': devServer === 'docz' && tpl.mdx(params),
      'bisheng.config.js': devServer === 'bisheng' && tpl.bisheng(params),
      'posts/README.md': devServer === 'bisheng' && tpl.posts_readme()(params),
      '.storybook/addons.js': devServer === 'storybook' && tpl.storybook_addons(params),
      '.storybook/config.js': devServer === 'storybook' && tpl.storybook_config(params),
      '.storybook/manager-head.html': devServer === 'storybook' && tpl.storybook_mhead(params),
      '.storybook/webpack.config.js': devServer === 'storybook' && tpl.storybook_webpack(params),
      '.storybook/theme.js': devServer === 'storybook' && tpl.storybook_theme(params),
      'doczrc.js': devServer === 'docz' && tpl.doczrc(params),
      'gatsby-config.js': devServer === 'docz' && tpl.gatsby(params),
      'styleguide.config.js': devServer === 'styleguidist' && tpl.styleguidist({ ...params, git })
    };
    /**
     * create files
     */
    const file_path = (p: string) => path.resolve(initPath, p);
    for (const p in pathToFileContentMap) {
      outputFile({
        file_path: file_path(p),
        file_content: pathToFileContentMap[p]
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
    buildDepArr,
    buildDepStr,
    devDepArr
  } = await devDependencies(strategy, {
    ts,
    eslint,
    prettier,
    commitlint,
    style,
    stylelint,
    test,
    devServer,
    tag
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
        tsDepArr = [ ...intersection(tsDepArr, tsDepArr.filter(v => v !== item_rm)) ];
        testDepArr = [ ...intersection(testDepArr, testDepArr.filter(v => v !== item_rm)) ];
        eslintDepArr = [ ...intersection(eslintDepArr, eslintDepArr.filter(v => v !== item_rm)) ];
        prettierDepArr = [ ...intersection(prettierDepArr, prettierDepArr.filter(v => v !== item_rm)) ];
        commitlintDepArr = [ ...intersection(commitlintDepArr, commitlintDepArr.filter(v => v !== item_rm)) ];
        stylelintDepArr = [ ...intersection(stylelintDepArr, stylelintDepArr.filter(v => v !== item_rm)) ];
        devServerDepArr = [ ...intersection(devServerDepArr, devServerDepArr.filter(v => v !== item_rm)) ];
        buildDepArr = [ ...intersection(buildDepArr, buildDepArr.filter(v => v !== item_rm)) ];
      }
      defaultDepStr = arr2str(defaultDepArr);
      tsDepStr = arr2str(tsDepArr);
      testDepStr = arr2str(testDepArr);
      eslintDepStr = arr2str(eslintDepArr);
      prettierDepStr = arr2str(prettierDepArr);
      commitlintDepStr = arr2str(commitlintDepArr);
      stylelintDepStr = arr2str(stylelintDepArr);
      devServerDepStr = arr2str(devServerDepArr);
      buildDepStr = arr2str(buildDepArr);
      customDepStr = arr2str(add);
    }
  }

  const installDevCli = defaultDepStr ? `${installDevCliPrefix} ${defaultDepStr}` : '';
  const installTsDevCli = tsDepStr ? `${installDevCliPrefix} ${tsDepStr}` : '';
  const installTestDevCli = testDepStr ? `${installDevCliPrefix} ${testDepStr}` : '';
  const installEslintDevCli = eslintDepStr ? `${installDevCliPrefix} ${eslintDepStr}` : '';
  const installPrettierDevCli = prettierDepStr ? `${installDevCliPrefix} ${prettierDepStr}` : '';
  const installCommitlintDevCli = commitlintDepStr ? `${installDevCliPrefix} ${commitlintDepStr}` : '';
  const installStylelintDevCli = stylelintDepStr ? `${installDevCliPrefix} ${stylelintDepStr}` : '';
  const installServerDevCli = devServerDepStr ? `${installDevCliPrefix} ${devServerDepStr}` : '';
  const installBuildDevCli = buildDepStr ? `${installDevCliPrefix} ${buildDepStr}` : '';
  const installCustomDevCli = customDepStr ? `${installDevCliPrefix} ${customDepStr}` : '';
  logTime('DEPENDENCY(依赖解析)', true);

  if (install) {
    // 项目依赖安装
    logTime('INSTALL(安装依赖)');
    exec([
      installCli,
      installDevCli,
      installTsDevCli,
      installTestDevCli,
      installEslintDevCli,
      installPrettierDevCli,
      installCommitlintDevCli,
      installStylelintDevCli,
      installServerDevCli,
      installBuildDevCli,
      installCustomDevCli
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
      file_content: tpl.pkj({
        type_react: devDependencyMap['@types/react'],
        project_name,
        devServer
      })({
        ...params,
        install,
        dependencies: processDepStr(dependencies_str, 'dependencies'),
        devDependencies: processDepStr(`${defaultDepStr || ''} ${tsDepStr || ''} ${testDepStr || ''} ${eslintDepStr || ''} ${prettierDepStr || ''} ${commitlintDepStr || ''} ${stylelintDepStr || ''} ${devServerDepStr || ''} ${buildDepStr || ''} ${customDepStr || ''}`, 'devDependencies')
      })
    });
    logTime('STATIC(生成静态依赖文件)', true);
    success([]);
  }
}

export default $init;