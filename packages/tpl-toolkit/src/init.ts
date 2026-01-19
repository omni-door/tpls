import path from 'path';
import {
  arr2str,
  exec,
  outputFile,
  intersection,
  logErr,
  logWarn,
  logTime,
  logInfo
} from '@omni-door/utils';
import {
  tpls_init,
  tpls_origin_init
} from './templates';
import { devDependencies } from './configs/dependencies';
/* import types */
import type {
  PKJ_TOOL,
  STRATEGY,
  BUILD
} from '@omni-door/utils';
import type {
  TPLS_INITIAL,
  TPLS_ORIGIN_INITIAL,
  TPLS_INITIAL_FN,
  TPLS_INITIAL_RETURE
} from './templates';

export type ResultOfDependencies = string[] | { add?: string[]; remove?: string[]; };
export type InitOptions = {
  build?: BUILD;
  strategy: STRATEGY;
  projectName: string;
  initPath: string;
  configFileName?: string;
  git?: string;
  npm?: string;
  ts: boolean;
  test: boolean;
  eslint: boolean;
  prettier: boolean;
  commitlint: boolean;
  install: boolean;
  pkgtool?: PKJ_TOOL;
  isSlient?: boolean;
  tag?: string;
  tpls?: (tpls: TPLS_ORIGIN_INITIAL) => TPLS_INITIAL_RETURE;
  dependencies?: (dependecies_default: string[]) => ResultOfDependencies;
  devDependencies?: (devDependecies_default: string[]) => ResultOfDependencies;
  error?: (err: any) => any;
  success?: (results: any[]) => any;
};

export async function $init ({
  build = 'rollup',
  strategy = 'stable',
  projectName: project_name,
  initPath,
  configFileName = 'omni.config.js',
  git = '',
  npm = '',
  ts,
  test,
  eslint,
  prettier,
  commitlint,
  tpls,
  pkgtool = 'yarn',
  install,
  isSlient,
  tag,
  dependencies: dependencies_custom,
  devDependencies: devDependencies_custom,
  error = () => process.exit(1),
  success = () => {}
}: InitOptions) {
  let installCliPrefix, installDevCliPrefix, installReadMe, runScript, paramScript;

  // if (pkgtool === 'pnpm') {
  //   logInfo('back to yarn because the typescript cannot compatible with the soft connection of pnpm');
  //   logInfo('Fallback to yarn because TypeScript is not yet compatible with pnpm symlink layout.');
  //   logInfo('https://github.com/microsoft/TypeScript/issues/29221');
  //   pkgtool = 'yarn';
  // }

  switch (pkgtool as PKJ_TOOL) {
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

  // Template parsing
  logTime('PARSE');
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
            logWarn(`The custom template "${name}" parsing encountered an error; the default template will be used for initialization`);

            return originTpl(config);
          }
        };
      };

      (list[name] as TPLS_INITIAL_FN) = tplFactory(list[name], tpls_init[name]) as TPLS_INITIAL_FN;
    }
  } catch (err_tpls) {
    logWarn(err_tpls as any);
    logWarn('Custom template generation failed; all templates will be initialized with the default template');

  }
  const tpl = { ...tpls_init, ...custom_tpl_list };
  const project_type = 'toolkit' as 'toolkit';
  logTime('PARSE', true);

  // Generate project files
  logTime('CREATE');
  const params = { project_type, project_name, ts, test, eslint, prettier, commitlint, strategy, configFileName };
  try {
    const pathToFileContentMap = {
      // default
      [`${configFileName}`]: tpl.omni(build)({ ...params, git, npm }),
      'package.json': install && tpl.pkj({ ...params, install, dependencies: '', devDependencies: '' }),
      '.gitignore': tpl.gitignore(params),
      '.npmignore': tpl.npmignore(params),
      [`src/index.${ts ? 'ts' : 'js'}`]: tpl.indexTpl(params),
      [`src/utils/getTs.${ts ? 'ts' : 'js'}`]: tpl.getTsTpl(params),
      'src/utils/.buildignore': '# This directory will be ignore when build the project',
      // typescript
      'tsconfig.json': ts && tpl.tsconfig(params),
      // lint
      '.vscode/settings.json': tpl.vscode(params),
      '.editorconfig': (eslint || prettier) && tpl.editor(params),
      '.eslintrc.js': eslint && tpl.eslint(params),
      '.eslintignore': eslint && tpl.eslintignore(params),
      'prettier.config.js': prettier && tpl.prettier(params),
      '.prettierignore': prettier && tpl.prettierignore(params),
      'commitlint.config.js': commitlint && tpl.commitlint(params),
      // build
      'babel.config.js': tpl.babel(params),
      'rollup.config.js': tpl.rollup(params),
      // docs
      'README.md': tpl.readme({ ...params, install: installReadMe, runScript, paramScript }),
      'README.zh-CN.md': tpl.readme_cn({ ...params, install: installReadMe, runScript, paramScript }),
      'DEV.md': tpl.readme_dev({ ...params, install: installReadMe, runScript, paramScript }),
      'DEV.zh-CN.md': tpl.readme_dev_cn({ ...params, install: installReadMe, runScript, paramScript }),
      'docs/index.md': tpl.docs({ ...params, install: installReadMe, runScript, paramScript }),
      // demo
      [`.dumirc.${ts ? 'ts' : 'js'}`]: tpl.dumirc(params),
      // '.env': tpl.env(params),
      // unit test
      '.mocharc.js': test && tpl.mocha(params),
      'mocha.tsx.js': test && ts && tpl.mocha_tsx(params),
      // husky
      '.husky/commit-msg': commitlint && tpl.husky_commit_msg(params),
      '.husky/pre-commit': commitlint && tpl.husky_pre_commit(params),
      '.husky/pre-push': commitlint && tpl.husky_pre_push(params),
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
  logTime('CREATE', true);

  // Dependency resolution
  logTime('DEPENDENCY');
  let dependencies_str = '';
  if (typeof dependencies_custom === 'function') {
    const result = dependencies_custom([]);
    if (result instanceof Array) {
      dependencies_str = arr2str(result);
    } else {
      const { add = [] } = result;
      dependencies_str = arr2str(add);
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
    devServerDepArr,
    devServerDepStr,
    devDepArr
  } = await devDependencies(strategy, {
    ts,
    eslint,
    prettier,
    commitlint,
    test,
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
        buildDepArr = [ ...intersection(buildDepArr, buildDepArr.filter(v => v !== item_rm)) ];
        tsDepArr = [ ...intersection(tsDepArr, tsDepArr.filter(v => v !== item_rm)) ];
        testDepArr = [ ...intersection(testDepArr, testDepArr.filter(v => v !== item_rm)) ];
        eslintDepArr = [ ...intersection(eslintDepArr, eslintDepArr.filter(v => v !== item_rm)) ];
        prettierDepArr = [ ...intersection(prettierDepArr, prettierDepArr.filter(v => v !== item_rm)) ];
        commitlintDepArr = [ ...intersection(commitlintDepArr, commitlintDepArr.filter(v => v !== item_rm)) ];
        devServerDepArr = [ ...intersection(devServerDepArr, devServerDepArr.filter(v => v !== item_rm)) ];
      }
      defaultDepStr = arr2str(defaultDepArr);
      buildDepStr = arr2str(buildDepArr);
      tsDepStr = arr2str(tsDepArr);
      testDepStr = arr2str(testDepArr);
      eslintDepStr = arr2str(eslintDepArr);
      prettierDepStr = arr2str(prettierDepArr);
      commitlintDepStr = arr2str(commitlintDepArr);
      devServerDepStr = arr2str(devServerDepArr);
      customDepStr = arr2str(add);
    }
  }

  const installDevCliArr = [];
  defaultDepStr && installDevCliArr.push(defaultDepStr);
  buildDepStr && installDevCliArr.push(buildDepStr);
  tsDepStr && installDevCliArr.push(tsDepStr);
  testDepStr && installDevCliArr.push(testDepStr);
  eslintDepStr && installDevCliArr.push(eslintDepStr);
  prettierDepStr && installDevCliArr.push(prettierDepStr);
  commitlintDepStr && installDevCliArr.push(commitlintDepStr);
  devServerDepStr && installDevCliArr.push(devServerDepStr);
  customDepStr && installDevCliArr.push(customDepStr);
  const installDevCli = `${installDevCliPrefix} ${installDevCliArr.join(' ')}`;
  logTime('DEPENDENCY', true);

  if (install) {
    // Install project dependencies
    logTime('INSTALL');
    exec([
      installCli,
      installDevCli
    ], res => {
      logTime('INSTALL', true);
      success(res);
    }, error, isSlient);
  } else {
    logTime('STATIC');
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
        devDependencies: processDepStr(`${defaultDepStr || ''} ${buildDepStr || ''} ${tsDepStr || ''} ${testDepStr || ''} ${eslintDepStr || ''} ${prettierDepStr || ''} ${commitlintDepStr || ''} ${devServerDepStr || ''} ${customDepStr || ''}`, 'devDependencies')
      })
    });
    logTime('STATIC', true);
    success([]);
  }
}

export default $init;