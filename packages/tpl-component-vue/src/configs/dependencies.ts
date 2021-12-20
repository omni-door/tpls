import { getDependency, arr2str } from '@omni-door/utils';
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
  tag?: string;
}

export async function dependencies (strategy: STRATEGY, config: Config) {
  const dependency = await getDependency(strategy, dependenciesMap);
  const deps = [
    dependency('classnames')
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
    tag
  } = config;

  const loaderDependencies = [
    dependency('babel-loader'),
    dependency('vue-loader'),
    dependency('vue-template-compiler'),
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
    dependency('babel-preset-vue'),
    dependency('@vue/babel-preset-jsx'),
    dependency('@vue/babel-helper-vue-jsx-merge-props'),
    dependency('@babel/plugin-transform-runtime'),
    dependency('@babel/plugin-proposal-class-properties'),
    dependency('@babel/plugin-proposal-decorators'),
    dependency('@babel/plugin-proposal-private-property-in-object'),
    dependency('@babel/plugin-proposal-private-methods'),
    ts ? dependency('@babel/preset-typescript') : '',
    ts ? dependency('babel-preset-typescript-vue3') : ''
  ];

  const testDependencies = test ? [
    dependency('vue-jest'),
    dependency('@vue/test-utils'),
    dependency('jest'),
    dependency('jest-transform-stub'),
    ts ? dependency('ts-jest') : '',
    dependency('babel-jest')
  ] : [];

  const testTypesDependencies = test ? [
    dependency('@types/jest')
  ] : [];

  const tsDependencies = ts ? [
    dependency('@types/node'),
    dependency('@types/classnames'),
    dependency('ttypescript'),
    dependency('typescript'),
    dependency('typescript-transform-paths'),
    dependency('ts-node'),
    ...testTypesDependencies
  ] : [];

  const eslintDependencies = eslint ? [
    dependency('eslint'),
    dependency('eslint-plugin-vue'),
    dependency('vue-eslint-parser'),
    ts ? dependency('@typescript-eslint/eslint-plugin') : '',
    ts ? dependency('@typescript-eslint/parser') : ''
  ] : [];

  const prettierDependencies = prettier ? [
    dependency('prettier'),
    eslint ? dependency('eslint-config-prettier') : '',
    eslint ? dependency('eslint-plugin-prettier') : '',
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
    style === 'all' || style === 'scss' ? dependency('stylelint-scss') : ''
  ] : [];

  const storybookDependencies = [
    dependency('@storybook/vue'),
    dependency('@storybook/addons'),
    dependency('@storybook/addon-options'),
    dependency('@storybook/addon-viewport'),
    dependency('@storybook/addon-actions'),
    dependency('@storybook/addon-console'),
    dependency('@storybook/addon-docs'),
    dependency('@storybook/addon-knobs'),
    dependency('@storybook/addon-links'),
    dependency('@storybook/addon-notes'),
    dependency('@storybook/theming'),
    dependency('storybook-readme'),
    ...loaderDependencies
  ];

  const devServerDependencies: string[] = [
    dependency('ip'),
    dependency('detect-port'),
    ...storybookDependencies
  ];

  const buildDependencies = [
    dependency('gulp'),
    dependency('gulp-autoprefixer'),
    dependency('gulp-babel'),
    dependency('gulp-clean-css'),
    dependency('gulp-concat'),
    dependency('gulp-concat-css'),
    dependency('gulp-cssnano'),
    dependency('gulp-replace-path'),
    dependency('@omni-door/gulp-plugin-vue-sfc'),
    (style === 'all' || style === 'less') ? dependency('gulp-less') : '',
    (style === 'all' || style === 'scss') ? dependency('gulp-sass') : '',
    dependency('gulp-if'),
    ts ? dependency('gulp-sourcemaps') : '',
    ts ? dependency('gulp-ts-alias') : '',
    ts ? dependency('gulp-typescript') : '',
    dependency('through2'),
    ...babelDependencies
  ];

  const defaultDep = [
    !tag ? dependency('@omni-door/cli') : `@omni-door/cli@${tag}`,
    dependency('del'),
    dependency('vue'),
    dependency('@vue/composition-api'),
    dependency('vue-property-decorator'),
    dependency('vue-class-component')
  ];

  return {
    devDepArr: [
      ...defaultDep,
      ...tsDependencies,
      ...testDependencies,
      ...eslintDependencies,
      ...prettierDependencies,
      ...commitlintDependencies,
      ...stylelintDependencies,
      ...devServerDependencies,
      ...buildDependencies
    ],
    defaultDepArr: defaultDep,
    defaultDepStr: arr2str(defaultDep),
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
    devServerDepStr: arr2str(devServerDependencies),
    buildDepArr: buildDependencies,
    buildDepStr: arr2str(buildDependencies)
  };
}
