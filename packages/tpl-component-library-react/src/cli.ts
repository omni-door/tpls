import { STRATEGY, STYLE, PKJTOOL, DEVSERVER, MARKDOWN, logErr } from '@omni-door/utils';
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
      stylesheet: 'scss' as STYLE,
      newPath: process.cwd(),
      hasStorybook: false,
      type: 'fc' as 'fc'
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
    try {
      newTpl(options);
    } catch (err) {
      logErr(err);
      process.exit(1);
    }
  } else if (args[0] === 'init') {
    // init
    const options = {
      strategy: 'stable' as STRATEGY,
      projectName: parse(process.cwd()).name,
      initPath: process.cwd(),
      devServer: 'docz' as DEVSERVER,
      ts: true,
      test: false,
      eslint: true,
      prettier: true,
      commitlint: false,
      style: 'scss' as STYLE,
      stylelint: true,
      install: true,
      pkgtool: 'yarn' as PKJTOOL
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
    try {
      init(options);
    } catch (err) {
      logErr(err);
      process.exit(1);
    }
  }
}