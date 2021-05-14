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
  const deps = [''];
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

  const defaultDep = [
    !tag ? dependency('@omni-door/cli') : `@omni-door/cli@${tag}`,
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
