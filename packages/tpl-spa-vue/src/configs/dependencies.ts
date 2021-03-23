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
    dependency('vue'),
    dependency('vue-router'),
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
  const dependency = await getDependency(strategy, devDependenciesMap);

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
    dependency('vue-loader'),
    dependency('@vue/compiler-sfc'),
    dependency('babel-loader'),
    style ? dependency('style-loader') : '',
    style ? dependency('css-loader') : '',
    style ? dependency('postcss') : '',
    style ? dependency('postcss-loader') : '',
    style ? dependency('autoprefixer') : '',
    style && layout === 'rem' ? dependency('postcss-plugin-px2rem') : '',
    style && layout === 'viewport' ? dependency('postcss-px-to-viewport') : '',
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
    ts ? dependency('@babel/preset-typescript') : ''
  ];

  const pluginDependencies = [
    dependency('html-webpack-plugin'),
    dependency('terser-webpack-plugin'),
    style ? dependency('optimize-css-assets-webpack-plugin') : '',
    style ? dependency('mini-css-extract-plugin') : '',
    style ? dependency('cssnano') : '',
    dependency('webpackbar'),
    dependency('webpack-bundle-analyzer'),
    style ? dependency('html-inline-css-webpack-plugin') : '',
    dependency('html-webpack-externals-plugin'),
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
    dependency('vue-jest'),
    dependency('@vue/test-utils'),
    dependency('jest'),
    dependency('jest-transform-stub')
  ] : [];

  const testTypesDependencies = test ? [
    dependency('@types/jest'),
    dependency('ts-jest')
  ] : [];

  const tsDependencies = ts ? [
    dependency('typescript'),
    dependency('ts-node'),
    dependency('@types/webpack-env'),
    ...testTypesDependencies
  ] : [];

  const eslintDependencies = eslint ? [
    dependency('eslint'),
    dependency('eslint-plugin-vue'),
    dependency('vue-eslint-parser'),
    ts ? dependency('@vue/eslint-config-typescript') : '',
    ts ? dependency('@typescript-eslint/eslint-plugin') : '',
    ts ? dependency('@typescript-eslint/parser') : ''
  ] : [];

  const prettierDependencies = prettier ? [
    dependency('prettier'),
    eslint ? dependency('eslint-config-prettier') : '',
    eslint ? dependency('eslint-plugin-prettier') : '',
    eslint ? dependency('@vue/eslint-config-prettier') : '',
    stylelint ? dependency('stylelint-config-prettier') : ''
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
    style === 'all' || style === 'scss' ? dependency('stylelint-scss') : ''
  ] : [];

  const devServerDependencies = [
    dependency('open'),
    dependency('ip'),
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
