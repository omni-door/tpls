import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import classNames from 'classnames';

export const classnames = (_prefix_: string) => (_prefix?: string) => (
  suffix?: string,
  className?: string
) => {
  let prefix = _prefix_;
  if (_prefix) prefix = _prefix_ + '-' + _prefix;
  return classNames(
    {
      [\\\`\\\${prefix}\\\`]: !!prefix && !suffix,
      [\\\`\\\${prefix}-\\\${suffix}\\\`]: !!prefix && !!suffix,
    },
    className
  );
};

export default classnames('prefix');
\``;

export const tpl_src_classnames = {
  tpl
};

export default tplEngineInit(tpl_src_classnames, 'tpl');