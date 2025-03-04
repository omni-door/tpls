import { getDependency, arr2str } from '@omni-door/utils';
import { dependencies as dependenciesMap, devDependencies as devDependenciesMap } from './dependencies_stable_map';
import type { STYLE, COMPONENT_SERVER, STRATEGY } from '@omni-door/utils';

interface Config {
  ts: boolean;
  test: boolean;
  eslint: boolean;
  prettier: boolean;
  commitlint: boolean;
  style: STYLE;
  stylelint: boolean;
  devServer: COMPONENT_SERVER;
  tag?: string;
}

export async function dependencies(strategy: STRATEGY) {
  const dependency = await getDependency(strategy, dependenciesMap);
  const deps: string[] = [
    dependency('classnames')
  ];
  return {
    depArr: [...deps],
    depStr: arr2str(deps)
  };
}

export async function devDependencies(strategy: STRATEGY, config: Config) {
  const dependency = await getDependency(strategy, await devDependenciesMap);

  const {
    ts,
    test,
    eslint,
    prettier,
    commitlint,
    style,
    stylelint,
    devServer,
    tag
  } = config;

  const loaderDependencies = [
    dependency('babel-loader'),
    style ? dependency('style-loader') : '',
    style ? dependency('css-loader') : '',
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
    dependency('@babel/plugin-transform-runtime'),
    dependency('@babel/plugin-proposal-class-properties'),
    ts ? dependency('@babel/preset-typescript') : ''
  ];

  const testDependencies = test ? [
    dependency('@testing-library/dom'),
    dependency('@testing-library/jest-dom'),
    dependency('@testing-library/react'),
    dependency('@testing-library/user-event'),
    dependency('jest'),
    dependency('jest-canvas-mock'),
    dependency('jest-environment-jsdom'),
    dependency('jest-transform-stub'),
    dependency('jsdom'),
    dependency('jsdom-global'),
    dependency('sinon'),
    ts ? dependency('ts-jest') : dependency('babel-jest')
  ] : [];

  const testTypesDependencies = test ? [
    dependency('@types/jest'),
    dependency('@types/jsdom')
  ] : [];

  const tsDependencies = ts ? [
    dependency('@types/classnames'),
    dependency('@types/node'),
    dependency('@types/react'),
    dependency('@types/react-dom'),
    dependency('ts-patch'),
    dependency('typescript'),
    dependency('typescript-transform-paths'),
    dependency('ts-node'),
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
    style === 'all' || style === 'scss' ? dependency('stylelint-config-standard-scss') : '',
    style === 'all' || style === 'scss' ? dependency('stylelint-scss') : '',
    style === 'all' || style === 'less' ? dependency('stylelint-config-standard-less') : '',
    style === 'all' || style === 'less' ? dependency('stylelint-less') : ''
  ] : [];

  const storybookDependencies = [
    dependency('@chromatic-com/storybook'),
    dependency('@storybook/react'),
    dependency('@storybook/blocks'),
    dependency('@storybook/addon-onboarding'),
    dependency('@storybook/addon-viewport'),
    dependency('@storybook/addon-actions'),
    dependency('@storybook/addon-console'),
    dependency('@storybook/addon-docs'),
    dependency('@storybook/react-vite'),
    dependency('@storybook/addon-essentials'),
    dependency('@storybook/addon-interactions'),
    dependency('@storybook/addon-knobs'),
    dependency('@storybook/addon-links'),
    dependency('@storybook/test'),
    dependency('@storybook/theming'),
    dependency('@storybook/manager-api'),
    dependency('storybook'),
    dependency('vite'),
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
    dependency('react'),
    dependency('react-dom')
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

