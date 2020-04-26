import { BUILD, STRATEGY, STYLE, PKJTOOL } from '@omni-door/utils';
import { parse } from 'path';
import init, { newTpl } from './index';
const args = process.argv.slice(2);

type Option = {
  [key: string]: string | boolean;
};

if (args.length > 0) {
  if (args[0] === 'new' && args[1]) {
    // new template
    const options = {
      ts: true,
      test: true,
      componentName: 'Omni',
      newPath: process.cwd()
    };
    for (let i = 1; i < args.length; i++) {
      const item = args[i];
      const [ k, val ] = item.split('=');
      (options as Option)[k] = val === 'true'
        ? true
        : val === 'false'
          ? false
          : val;
    }
    newTpl(options);
  } else if (args[0] === 'init') {
    const options = {
      build: 'rollup' as BUILD,
      strategy: 'stable' as STRATEGY,
      projectName: parse(process.cwd()).name,
      initPath: process.cwd(),
      ts: true,
      test: false,
      eslint: true,
      prettier: true,
      commitlint: false,
      style: 'scss' as STYLE,
      stylelint: true,
      pkgtool: 'yarn' as PKJTOOL
    };
    for (let i = 0; i < args.length; i++) {
      const item = args[i];
      const [ k, val ] = item.split('=');
      (options as Option)[k] = val === 'true'
        ? true
        : val === 'false'
          ? false
          : val as any;
    }
    init(options);
  }
}