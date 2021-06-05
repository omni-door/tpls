import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import classNames from 'classnames';

export const classnames = (_prefix: string) => (prefix?: string) => (
  suffix?: string,
  className?: string
) => {
  if (prefix) prefix = _prefix + '-' + prefix;
  else prefix = _prefix;
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