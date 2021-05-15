import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import classNames from 'classnames';

export const classnames = ({ prefix, theme }: { prefix?: string; theme?: string }) => (
  suffix?: string,
  className?: string
) =>
  classNames(
    {
      [\\\`\\\${prefix}\\\`]: !!prefix && !suffix,
      [\\\`\\\${prefix}-\\\${theme}\\\`]: !!prefix && !suffix && !!theme,
      [\\\`\\\${prefix}-\\\${suffix}\\\`]: !!prefix && !!suffix,
      [\\\`\\\${prefix}-\\\${theme}-\\\${suffix}\\\`]: !!prefix && !!suffix && !!theme
    },
    className
  );

export default classnames;
\``;

export const tpl_src_classnames = {
  tpl
};

export default tplEngineInit(tpl_src_classnames, 'tpl');