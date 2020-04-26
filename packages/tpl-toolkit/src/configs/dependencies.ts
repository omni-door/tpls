import { getDependency, arr2str, STRATEGY } from '@omni-door/utils';
import { devDependencies as devDependenciesMap } from './dependencies_stable_map';

interface Config {
  ts: boolean;
  test: boolean;
  eslint: boolean;
  prettier: boolean;
  commitlint: boolean;
}

export function devDependencies (strategy: STRATEGY, config: Config) {
  const dependency = getDependency(strategy, devDependenciesMap);

  const {
    ts,
    test,
    eslint,
    prettier,
    commitlint
  } = config;

  const babelDependencies = [
    dependency('@babel/core'),
    dependency('@babel/preset-env'),
    ts ? dependency('@babel/preset-typescript') : ''
  ];

  const buildDependencies = [
    dependency('rollup'),
    dependency('rollup-plugin-node-resolve'),
    dependency('rollup-plugin-babel'),
    dependency('rollup-plugin-commonjs'),
    dependency('rollup-plugin-node-resolve'),
    ts ? dependency('rollup-plugin-typescript') : '',
    ts ? dependency('rollup-plugin-typescript2') : '',
    dependency('rollup-plugin-json'),
    ...babelDependencies
  ];

  const testDependencies = test ? [
    dependency('chai'),
    dependency('mocha'),
    dependency('nyc'),
    dependency('karma'),
    dependency('karma-chrome-launcher'),
    dependency('karma-firefox-launcher'),
    dependency('karma-coverage'),
    dependency('karma-firefox-launcher'),
    dependency('karma-mocha'),
    dependency('karma-opera-launcher'),
    dependency('karma-safari-launcher'),
    dependency('karma-typescript'),
    dependency('karma-webpack')
  ] : [];

  const testTypesDependencies = test ? [
    dependency('@types/chai'),
    dependency('@types/mocha')
  ] : [];

  const tsDependencies = ts ? [
    dependency('typescript'),
    dependency('ts-node'),
    dependency('ts-loader'),
    ...testTypesDependencies
  ] : [];

  const eslintDependencies = eslint ? [
    dependency('eslint'),
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

  const dumiDependencies = [
    dependency('dumi')
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
      ...dumiDependencies
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
    devServerDepArr: dumiDependencies,
    devServerDepStr: arr2str(dumiDependencies)
  };
}

