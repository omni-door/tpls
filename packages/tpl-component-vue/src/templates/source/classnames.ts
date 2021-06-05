import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import classNames from 'classnames';

export const classnames = (prefix: string) => (block?: string) => (
  suffix?: string,
  className?: string
) => {
  if (block) prefix = prefix + '-' + block;
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