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
}

export function dependencies (strategy: STRATEGY, config: Config) {
  const { ssrServer } = config;
  const isKoa = ssrServer === 'koa-next' || ssrServer === 'koa-nuxt';
  const dependency = getDependency(strategy, dependenciesMap);
  const deps = [
    dependency('react'),
    dependency('react-dom'),
    dependency('next'),
    dependency('webpack-merge'),
    isKoa ? dependency('next-url-prettifier') : '',
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

export function devDependencies (strategy: STRATEGY, config: Config) {
  const dependency = getDependency(strategy, devDependenciesMap);

  const {
    ts,
    test,
    eslint,
    prettier,
    commitlint,
    style,
    stylelint,
    ssrServer
  } = config;
  const isKoa = ssrServer === 'koa-next' || ssrServer === 'koa-nuxt';

  const babelDependencies = [
    dependency('@babel/plugin-proposal-decorators')
  ];

  const nextDependencies = [
    ...babelDependencies,
    dependency('next-compose-plugins'),
    dependency('next-transpile-modules'),
    dependency('@next/bundle-analyzer'),
    style ? dependency('postcss-px-to-viewport') : '',
    style ? dependency('@zeit/next-css') : '',
    (style === 'all' || style === 'less') ? dependency('less') : '',
    (style === 'all' || style === 'less') ? dependency('@zeit/next-less') : '',
    (style === 'all' || style === 'scss') ? dependency('node-sass') : '',
    (style === 'all' || style === 'scss') ? dependency('@zeit/next-sass') : ''
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
    ts ? dependency('@types/vfile-message') : '', // stylelint -> postcss-markdown -> remark -> unified -> @types/vfile(3.0.0) -> @types/vfile-message(*)
    style === 'all' || style === 'scss' ? dependency('stylelint-scss') : ''
  ] : [];

  const serverDependencies = [
    dependency('open'),
    dependency('ip'),
    dependency('detect-port'),
    dependency('http-proxy-middleware')
  ];

  const defaultDep = [
    dependency('@omni-door/cli'),
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
