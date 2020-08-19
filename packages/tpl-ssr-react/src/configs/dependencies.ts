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
}

export function dependencies (strategy: STRATEGY) {
  const dependency = getDependency(strategy, dependenciesMap);
  const deps = [''];
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

  const defaultDep = [
    dependency('@omni-door/cli'),
    dependency('del')
  ];

  return {
    devDepArr: [
      ...defaultDep
    ],
    defaultDepArr: defaultDep,
    defaultDepStr: arr2str(defaultDep)
  };
}
