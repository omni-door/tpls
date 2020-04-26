import path from 'path';
import {
  exec,
  arr2str,
  intersection,
  output_file,
  logInfo,
  logErr,
  logWarn,
  logSuc,
  logTime,
  PKJTOOL,
  STYLE,
  STRATEGY,
  DEVSERVER,
  MARKDOWN
} from '@omni-door/utils';
import {
  TPLS_INITIAL,
  TPLS_ORIGIN_INITIAL,
  TPLS_INITIAL_FN,
  TPLS_INITIAL_RETURE,
  TPLS_ORIGIN_NEW,
  TPLS_NEW_FN,
  TPLS_NEW_RETURE,
  tpls,
  tpls_origin
} from './templates';
import { dependencies, devDependencies } from './configs/dependencies';
import { devDependencies as devDependencyMap } from './configs/dependencies_stable_map';
export { setBrand, setLogo } from '@omni-door/utils';
export { TPLS_ORIGIN_INITIAL, TPLS_INITIAL_FN, TPLS_INITIAL_RETURE, TPLS_ORIGIN_NEW, TPLS_NEW_FN, TPLS_NEW_RETURE } from './templates';

const {
  component_class,
  component_functional,
  component_index,
  component_readme,
  component_stylesheet,
  component_test,
  component_mdx,
  component_stories,
  ...default_tpl_list
} = tpls;

const {
  tpl_new_class,
  tpl_new_functional,
  tpl_new_index,
  tpl_new_mdx,
  tpl_new_readme,
  tpl_new_story,
  tpl_new_stylesheet,
  tpl_new_test,
  ...origin_tpl_list
} = tpls_origin;

export type ResultOfDependencies = string[] | { add?: string[]; remove?: string[]; };

export type InitOptions = {
  strategy: STRATEGY;
  projectName: string;
  initPath: string;
  configFileName?: string;
  devServer: DEVSERVER;
  ts: boolean;
  test: boolean;
  eslint: boolean;
  prettier: boolean;
  commitlint: boolean;
  style: STYLE;
  stylelint: boolean;
  pkgtool?: PKJTOOL;
  isSlient?: boolean;
  tpls?: (tpls: TPLS_ORIGIN_INITIAL) => TPLS_INITIAL_RETURE;
  dependencies?: (dependecies_default: string[]) => ResultOfDependencies;
  devDependencies?: (devDependecies_default: string[]) => ResultOfDependencies;
  error?: (err: any) => any;
  success?: (results: any[]) => any;
};

async function init ({
  strategy = 'stable',
  projectName: project_name,
  initPath,
  configFileName = 'omni.config.js',
  devServer,
  ts,
  test,
  eslint,
  prettier,
  commitlint,
  style,
  stylelint,
  tpls,
  pkgtool = 'yarn',
  isSlient,
  dependencies: dependencies_custom,
  devDependencies: devDependencies_custom,
  error = () => {
    logErr('组件库项目安装失败！(The component-library project installation has been occured some error!)');
    process.exit(1);
  },
  success = () => logSuc('组件库项目安装完成！(The component-library project installation has been completed!)')
}: InitOptions) {
  // 模板解析
  logTime('模板解析');
  let custom_tpl_list = {};
  try {
    custom_tpl_list = typeof tpls === 'function'
      ? tpls(origin_tpl_list)
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
              // because call the originTpl will affect the origin_tpl_list's tpl
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

      (list[name] as TPLS_INITIAL_FN) = tplFactory(list[name], default_tpl_list[name]) as TPLS_INITIAL_FN;
    }
  } catch (err_tpls) {
    logWarn(err_tpls);
    logWarn('生成自定义模板出错，将全部使用默认模板进行初始化！(The custom template generating occured error, all will be initializated with the default template!)');
  }
  const tpl = { ...default_tpl_list, ...custom_tpl_list };
  const project_type = 'component-library-react' as 'component-library-react';
  logTime('模板解析', true);

  // 生成项目文件
  logTime('生成文件');
  const params = { project_type, project_name, ts, test, eslint, prettier, commitlint, style, stylelint, strategy, configFileName };
  const pathToFileContentMap = {
    // default files
    [`${configFileName}`]: tpl.omni(devServer === 'docz')(params),
    'package.json': tpl.pkj({
      type_react: devDependencyMap['@types/react'],
      project_name,
      devServer
    })(params),
    '.gitignore': tpl.gitignore(params),
    '.npmignore': tpl.npmignore(params),
    [`src/components/index.${ts ? 'ts' : 'js'}`]: tpl.source_index(params),
    'src/@types/global.d.ts': ts && tpl.source_d(params), // d.ts files
    'tsconfig.json': ts && tpl.tsconfig(params), // tsconfig
    'jest.config.js': test && tpl.jest(params), // test files
    // lint files
    '.eslintrc.js': eslint && tpl.eslint(params),
    '.eslintignore': eslint && tpl.eslintignore(params),
    'prettier.config.js': prettier && tpl.prettier(params),
    '.prettierignore': prettier && tpl.prettierignore(params),
    'stylelint.config.js': stylelint && tpl.stylelint(params),
    'commitlint.config.js': commitlint && tpl.commitlint(params),
    'babel.config.js': (devServer === 'storybook' || devServer === 'styleguidist') && tpl.babel(params), // build file
    'README.md': tpl.readme(params), // ReadMe
    // server files
    'src/index.mdx': devServer === 'docz' && tpl.mdx(params),
    'bisheng.config.js': devServer === 'bisheng' && tpl.bisheng(params),
    'posts/README.md': devServer === 'bisheng' && tpl.posts_readme()(params),
    '.storybook/addons.js': devServer === 'storybook' && tpl.storybook_addons(params),
    '.storybook/config.js': devServer === 'storybook' && tpl.storybook_config(params),
    '.storybook/manager-head.html': devServer === 'storybook' && tpl.storybook_mhead(params),
    '.storybook/webpack.config.js': devServer === 'storybook' && tpl.storybook_webpack(params),
    'doczrc.js': devServer === 'docz' && tpl.doczrc(params),
    'gatsby-config.js': devServer === 'docz' && tpl.gatsby(params),
    'styleguide.config.js': devServer === 'styleguidist' && tpl.styleguidist(params)
  };
  /**
   * create files
   */
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
  let installCliPrefix = pkgtool === 'yarn' ? `${pkgtool} add --cwd ${initPath}` : `${pkgtool} install --save --prefix ${initPath}`;
  let installDevCliPrefix = pkgtool === 'yarn' ? `${pkgtool} add -D --cwd ${initPath}` : `${pkgtool} install --save-dev --prefix ${initPath}`;
  if (pkgtool === 'cnpm' && initPath !== process.cwd()) {
    installCliPrefix = `cd ${initPath} && ${installCliPrefix}`;
    installDevCliPrefix = `cd ${initPath} && ${installDevCliPrefix}`;
  }

  let {
    depArr,
    depStr
  } = dependencies(strategy);
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
    devDepArr
  } = devDependencies(strategy, {
    ts,
    eslint,
    prettier,
    commitlint,
    style,
    stylelint,
    test,
    devServer
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
      }
      defaultDepStr = arr2str(defaultDepArr);
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
  const installTsDevCli = tsDepStr ? `${installDevCliPrefix} ${tsDepStr}` : '';
  const installTestDevCli = testDepStr ? `${installDevCliPrefix} ${testDepStr}` : '';
  const installEslintDevCli = eslintDepStr ? `${installDevCliPrefix} ${eslintDepStr}` : '';
  const installPrettierDevCli = prettierDepStr ? `${installDevCliPrefix} ${prettierDepStr}` : '';
  const installCommitlintDevCli = commitlintDepStr ? `${installDevCliPrefix} ${commitlintDepStr}` : '';
  const installStylelintDevCli = stylelintDepStr ? `${installDevCliPrefix} ${stylelintDepStr}` : '';
  const installServerDevCli = devServerDepStr ? `${installDevCliPrefix} ${devServerDepStr}` : '';
  const installCustomDevCli = customDepStr ? `${installDevCliPrefix} ${customDepStr}` : '';
  logTime('依赖解析', true);

  // 项目依赖安装
  logTime('安装依赖');
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
    installCustomDevCli
  ], res => {
    logTime('安装依赖', true);
    success(res);
  }, error, isSlient);
}

const default_tpl_new_list = {
  component_class,
  component_functional,
  component_index,
  component_readme,
  component_stylesheet,
  component_test,
  component_mdx,
  component_stories
};

const origin_tpl_new_list = {
  tpl_new_class,
  tpl_new_functional,
  tpl_new_index,
  tpl_new_mdx,
  tpl_new_readme,
  tpl_new_story,
  tpl_new_stylesheet,
  tpl_new_test
};

export function newTpl ({
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
      ? tpls(origin_tpl_new_list)
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

        return default_tpl_new_list[name](config);
      };

      (list[name] as TPLS_NEW_FN) = tplFactory as TPLS_NEW_FN;
    }
  } catch (err_tpls) {
    logWarn(err_tpls);
    logWarn('生成自定义模板出错，将全部使用默认模板进行创建组件！(The custom template generating occured error, all will be initializated with the default template!)');
  }
  const tpl = { ...default_tpl_new_list, ...custom_tpl_new_list };
  const params = {
    ts,
    test,
    componentName,
    style: stylesheet,
    md
  };
  // component tpl
  const content_index = tpl.component_index(params);
  const content_cc = type === 'cc' && tpl.component_class(params);
  const content_fc = type === 'fc' && tpl.component_functional(params);
  const content_readme = md === 'md' && tpl.component_readme(params);
  const content_mdx = md === 'mdx' && tpl.component_mdx(params);
  const content_stories = hasStorybook && tpl.component_stories(params);
  const content_style = stylesheet && tpl.component_stylesheet(params);
  const content_test = test && tpl.component_test(params);

  const pathToFileContentMap = {
    [`index.${ts ? 'ts' : 'js'}`]: content_index,
    [`${componentName}.${ts ? 'tsx' : 'jsx'}`]: content_fc || content_cc,
    [`style/${componentName}.${stylesheet}`]: content_style,
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

export default init;