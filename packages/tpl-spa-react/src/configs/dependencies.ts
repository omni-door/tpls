import { getDependency, arr2str, STYLE, STRATEGY } from '@omni-door/utils';
import { dependencies as dependenciesMap, devDependencies as devDependenciesMap } from './dependencies_stable_map';

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
  const deps = [
    dependency('react'),
    dependency('react-dom'),
    dependency('core-js'),
    dependency('regenerator-runtime')
  ];
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

  const loaderDependencies = [
    dependency('babel-loader'),
    style ? dependency('style-loader') : '',
    style ? dependency('css-loader') : '',
    (style === 'all' || style === 'less') ? dependency('less') : '',
    (style === 'all' || style === 'less') ? dependency('less-loader') : '',
    (style === 'all' || style === 'scss') ? dependency('sass-loader') : '',
    (style === 'all' || style === 'scss') ? dependency('node-sass') : '',
    dependency('url-loader'),
    dependency('file-loader')
  ];

  const babelDependencies = [
    dependency('@babel/core'),
    dependency('@babel/preset-env'),
    dependency('@babel/preset-react'),
    dependency('@umijs/babel-plugin-auto-css-modules'),
    ts ? dependency('@babel/preset-typescript') : ''
  ];

  const pluginDependencies = [
    dependency('html-webpack-plugin'),
    dependency('terser-webpack-plugin'),
    dependency('optimize-css-assets-webpack-plugin'),
    dependency('mini-css-extract-plugin'),
    dependency('cssnano'),
    dependency('webpackbar'),
    dependency('webpack-bundle-analyzer'),
    dependency('hard-source-webpack-plugin'),
    ts ? dependency('fork-ts-checker-webpack-plugin') : ''
  ];

  const buildDependencies = [
    dependency('webpack'),
    dependency('webpack-cli'),
    dependency('webpack-merge'),
    ...pluginDependencies,
    ...loaderDependencies,
    ...babelDependencies
  ];

  const testDependencies = test ? [
    dependency('enzyme'),
    dependency('enzyme-adapter-react-16'),
    dependency('jest'),
    dependency('jest-transform-stub')
  ] : [];

  const testTypesDependencies = test ? [
    dependency('@types/jest'),
    dependency('@types/enzyme'),
    dependency('@types/enzyme-adapter-react-16'),
    dependency('ts-jest')
  ] : [];

  const tsDependencies = ts ? [
    dependency('@types/react'),
    dependency('@types/react-dom'),
    dependency('typescript'),
    dependency('ts-node'),
    dependency('@types/webpack-env'),
    ...testTypesDependencies
  ] : [];

  const eslintDependencies = eslint ? [
    dependency('eslint'),
    dependency('eslint-plugin-react'),
    ts ? dependency('@typescript-eslint/eslint-plugin') : '',
    ts ? dependency('@typescript-eslint/parser') : ''
  ] : [];

  const prettierDependencies = prettier ? [
    dependency('prettier'),
    eslint ? dependency('eslint-config-prettier') : '',
    eslint ? dependency('eslint-plugin-prettier') : ''
  ] : [];

  const commitlintDependencies = commitlint ? [
    dependency('@commitlint/cli'),
    dependency('husky'),
    dependency('lint-staged')
  ] : [];

  const stylelintDependencies = stylelint ? [
    dependency('stylelint'),
    dependency('stylelint-config-standard'),
    dependency('stylelint-config-standard'),
    dependency('stylelint-config-css-modules'),
    dependency('stylelint-config-rational-order'),
    dependency('stylelint-config-prettier'),
    dependency('stylelint-order'),
    dependency('stylelint-declaration-block-no-ignored-properties'),
    ts ? dependency('@types/vfile-message') : '', // stylelint -> postcss-markdown -> remark -> unified -> @types/vfile(3.0.0) -> @types/vfile-message(*)
    style === 'all' || style === 'scss' ? dependency('stylelint-scss') : ''
  ] : [];

  const devServerDependencies = [
    dependency('open'),
    dependency('ip'),
    dependency('detect-port'),
    dependency('express'),
    dependency('webpack-dev-middleware'),
    dependency('webpack-hot-middleware'),
    dependency('http-proxy-middleware')
  ];

  const defaultDep = [
    dependency('@omni-door/cli'),
    dependency('del')
  ];

  return {
    devDepArr: [
      ...defaultDep,
      ...buildDependencies,
      ...tsDependencies,
      ...testDependencies,
      ...eslintDependencies,
      ...prettierDependencies,
      ...commitlintDependencies,
      ...stylelintDependencies,
      ...devServerDependencies
    ],
    defaultDepArr: defaultDep,
    defaultDepStr: arr2str(defaultDep),
    buildDepArr: buildDependencies,
    buildDepStr: arr2str(buildDependencies),
    tsDepArr: tsDependencies,
    tsDepStr: arr2str(tsDependencies),
    testDepArr: testDependencies,
    testDepStr: arr2str(testDependencies),
    eslintDepArr: eslintDependencies,
    eslintDepStr: arr2str(eslintDependencies),
    prettierDepArr: prettierDependencies,
    prettierDepStr: arr2str(prettierDependencies),
    commitlintDepArr: commitlintDependencies,
    commitlintDepStr: arr2str(commitlintDependencies),
    stylelintDepArr: stylelintDependencies,
    stylelintDepStr: arr2str(stylelintDependencies),
    devServerDepArr: devServerDependencies,
    devServerDepStr: arr2str(devServerDependencies)
  };
}

