import { getDependency, arr2str } from '@omni-door/utils';
import { dependencies as dependenciesMap, devDependencies as devDependenciesMap } from './dependencies_stable_map';
import type { STYLE, STRATEGY, LAYOUT } from '@omni-door/utils';

interface Config {
  ts: boolean;
  test: boolean;
  eslint: boolean;
  prettier: boolean;
  commitlint: boolean;
  style: STYLE;
  layout: LAYOUT;
  stylelint: boolean;
  tag?: string;
}

export async function dependencies (strategy: STRATEGY, config: Config) {
  const dependency = await getDependency(strategy, dependenciesMap);
  const deps = [
    dependency('react'),
    dependency('react-dom'),
    dependency('react-router-dom'),
    dependency('core-js'),
    dependency('regenerator-runtime'),
    config.layout === 'rem' ? dependency('amfe-flexible') : ''
  ];
  return {
    depArr: [ ...deps ],
    depStr: arr2str(deps)
  };
}

export async function devDependencies (strategy: STRATEGY, config: Config) {
  const dependency = await getDependency(strategy, await devDependenciesMap);

  const {
    ts,
    test,
    eslint,
    prettier,
    commitlint,
    style,
    stylelint,
    layout,
    tag
  } = config;

  const loaderDependencies = [
    dependency('babel-loader'),
    style ? dependency('style-loader') : '',
    style ? dependency('css-loader') : '',
    style ? dependency('postcss') : '',
    style ? dependency('postcss-loader') : '',
    style ? dependency('autoprefixer') : '',
    style && layout === 'rem' ? dependency('postcss-plugin-px2rem') : '',
    style && layout === 'viewport' ? dependency('postcss-px-to-viewport-8-plugin') : '',
    (style === 'all' || style === 'less') ? dependency('less') : '',
    (style === 'all' || style === 'less') ? dependency('less-loader') : '',
    (style === 'all' || style === 'scss') ? dependency('sass') : '',
    (style === 'all' || style === 'scss') ? dependency('sass-loader') : '',
    dependency('url-loader'),
    dependency('file-loader')
  ];

  const babelDependencies = [
    dependency('@babel/core'),
    dependency('@babel/preset-env'),
    dependency('@babel/preset-react'),
    style ? dependency('@umijs/babel-plugin-auto-css-modules') : '',
    ts ? dependency('@babel/preset-typescript') : ''
  ];

  const pluginDependencies = [
    dependency('html-webpack-plugin'),
    dependency('terser-webpack-plugin'),
    style ? dependency('css-minimizer-webpack-plugin') : '',
    style ? dependency('mini-css-extract-plugin') : '',
    style ? dependency('cssnano') : '',
    dependency('webpackbar'),
    dependency('webpack-bundle-analyzer'),
    style ? dependency('html-inline-css-webpack-plugin') : '',
    dependency('html-webpack-externals-plugin'),
    dependency('@pmmmwh/react-refresh-webpack-plugin'),
    dependency('react-refresh'),
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
    dependency('@cfaester/enzyme-adapter-react-18'),
    dependency('jest'),
    dependency('jest-transform-stub'),
    dependency('jsdom'),
    dependency('jsdom-global'),
    dependency('sinon'),
    ts ? dependency('ts-jest') : dependency('babel-jest')
  ] : [];

  const testTypesDependencies = test ? [
    dependency('@types/jest'),
    dependency('@types/enzyme'),
    dependency('@types/jsdom')
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
    dependency('stylelint-config-css-modules'),
    dependency('stylelint-config-rational-order'),
    dependency('stylelint-order'),
    dependency('stylelint-declaration-block-no-ignored-properties'),
    ts ? dependency('@types/vfile-message') : '', // stylelint -> postcss-markdown -> remark -> unified -> @types/vfile(3.0.0) -> @types/vfile-message(*)
    style === 'all' || style === 'scss' ? dependency('stylelint-config-standard-scss') : '',
    style === 'all' || style === 'scss' ? dependency('stylelint-scss') : '',
    style === 'all' || style === 'less' ? dependency('stylelint-config-standard-less') : '',
    style === 'all' || style === 'less' ? dependency('stylelint-less') : ''
  ] : [];

  const devServerDependencies = [
    dependency('open'),
    dependency('ip'),
    dependency('cross-env'),
    dependency('detect-port'),
    dependency('express'),
    dependency('serve-favicon'),
    dependency('webpack-dev-middleware'),
    dependency('webpack-hot-middleware'),
    dependency('http-proxy-middleware')
  ];

  const defaultDep = [
    !tag ? dependency('@omni-door/cli') : `@omni-door/cli@${tag}`,
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

