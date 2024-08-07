import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import { memo } from 'react';
import { Link as NextLink } from 'next-url-prettifier';
import { nextRouter } from '../../routes';
\${ts ? \`/* import types */
import type { FC, PropsWithChildren } from 'react';

export interface LinkProps {
  href?: string;
  page?: string;
  params?: { [props: string]: any; };
  children?: React.ReactNode;
}
\` : '' }
export const Link\${ts ? ': FC<PropsWithChildren<LinkProps>>' : ''} = props => {
  const { href, page, params = {}, children } = props;

  return (
    <NextLink
      href={href}
      route={ page ? nextRouter.linkPage(page, params) : null}
    >
      { children }
    </NextLink>
  );
};

export default memo(Link);
\``;

export const tpl_src_component_link = {
  tpl
};

export default tplEngineInit(tpl_src_component_link, 'tpl');