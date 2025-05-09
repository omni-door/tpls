import { getDependency, arr2str } from '@omni-door/utils';
import { devDependencies as devDependenciesMap } from './dependencies_stable_map';
import type { STRATEGY } from '@omni-door/utils';

interface Config {
  ts: boolean;
  test: boolean;
  eslint: boolean;
  prettier: boolean;
  commitlint: boolean;
  tag?: string;
}

export async function devDependencies (strategy: STRATEGY, config: Config) {
  const dependency = await getDependency(strategy, await devDependenciesMap);

  const {
    ts,
    test,
    eslint,
    prettier,
    commitlint,
    tag
  } = config;

  const babelDependencies = [
    dependency('@babel/core'),
    dependency('@babel/plugin-transform-runtime'),
    dependency('@babel/preset-env'),
    dependency('@babel/runtime-corejs3'),
    ts ? dependency('@babel/preset-typescript') : ''
  ];

  const buildDependencies = [
    dependency('rollup'),
    dependency('@rollup/plugin-alias'),
    dependency('@rollup/plugin-babel'),
    dependency('@rollup/plugin-commonjs'),
    dependency('@rollup/plugin-node-resolve'),
    ts ? dependency('@rollup/plugin-typescript') : '',
    dependency('@rollup/plugin-json'),
    dependency('@rollup/plugin-terser'),
    ...babelDependencies
  ];

  const testDependencies = test ? [
    dependency('chai'),
    dependency('mocha'),
    dependency('nyc'),
    ts ? dependency('tsx') : '',
    dependency('webpack')
  ] : [];

  const testTypesDependencies = test ? [
    dependency('@types/chai'),
    dependency('@types/mocha')
  ] : [];

  const tsDependencies = ts ? [
    dependency('@types/node'),
    dependency('tsconfig-paths'),
    dependency('ts-patch'),
    dependency('typescript'),
    dependency('typescript-transform-paths'),
    dependency('ts-loader'),
    dependency('tslib'),
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
    dependency('dumi'),
    dependency('ip'),
    dependency('detect-port')
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

