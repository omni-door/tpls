import { getDependency, arr2str } from '@omni-door/utils';
import { dependencies as dependenciesMap, devDependencies as devDependenciesMap } from './dependencies_stable_map';
import type { STYLE, STRATEGY, SSRSERVER } from '@omni-door/utils';

interface Config {
  ts: boolean;
  test: boolean;
  eslint: boolean;
  prettier: boolean;
  commitlint: boolean;
  style: STYLE;
  stylelint: boolean;
  ssrServer: SSRSERVER;
  tag?: string;
}

export async function dependencies (strategy: STRATEGY, config: Config) {
  const { ssrServer } = config;
  const isKoa = ssrServer === 'koa-next' || ssrServer === 'koa-nuxt';
  const dependency = await getDependency(strategy, dependenciesMap);
  const deps = [
    dependency('react'),
    dependency('react-dom'),
    dependency('next'),
    dependency('webpack-merge'),
    isKoa ? dependency('next-url-prettifier') : '',
    isKoa ? dependency('@koa/cors') : '',
    isKoa ? dependency('koa') : '',
    isKoa ? dependency('koa-bodyparser') : '',
    isKoa ? dependency('koa-router') : '',
    isKoa ? dependency('koa-static') : '',
    isKoa ? dependency('koa2-connect') : ''
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
    ssrServer,
    tag
  } = config;
  const isKoa = ssrServer === 'koa-next' || ssrServer === 'koa-nuxt';

  const babelDependencies = [
    dependency('@babel/core'),
    dependency('@babel/plugin-proposal-decorators'),
    dependency('@babel/runtime')
  ];

  const nextDependencies = [
    ...babelDependencies,
    dependency('next-compose-plugins'),
    dependency('next-transpile-modules'),
    dependency('@next/bundle-analyzer'),
    dependency('postcss-px-to-viewport-8-plugin'),
    dependency('sass'),
    dependency('less'),
    dependency('less-loader'),
    dependency('next-with-less')
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
    dependency('@types/node'),
    dependency('typescript'),
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
    ts ? dependency('@types/vfile-message') : '', // stylelint -> postcss-markdown -> remark -> unified -> @types/vfile(3.0.0) -> @types/vfile-message(*)
    dependency('stylelint-config-standard-scss'),
    dependency('stylelint-scss'),
    dependency('stylelint-config-standard-less'),
    dependency('stylelint-less')
  ] : [];

  const serverDependencies = [
    dependency('open'),
    dependency('ip'),
    dependency('cross-env'),
    dependency('detect-port'),
    dependency('http-proxy-middleware')
  ];

  const defaultDep = [
    !tag ? dependency('@omni-door/cli') : `@omni-door/cli@${tag}`,
    dependency('del')
  ];

  return {
    devDepArr: [
      ...defaultDep,
      ...nextDependencies,
      ...tsDependencies,
      ...testDependencies,
      ...eslintDependencies,
      ...prettierDependencies,
      ...commitlintDependencies,
      ...stylelintDependencies,
      ...serverDependencies
    ],
    defaultDepArr: defaultDep,
    defaultDepStr: arr2str(defaultDep),
    nextDepArr: nextDependencies,
    nextDepStr: arr2str(nextDependencies),
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
    serverDepArr: serverDependencies,
    serverDepStr: arr2str(serverDependencies)
  };
}
