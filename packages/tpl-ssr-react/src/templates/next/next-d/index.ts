import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`/// <reference types='next' />
/// <reference types='next/types/global' />

declare module '*.css';

declare module '*.less';

declare module '*.scss';

declare module '*.sass';

declare module '*.svg';

declare module '*.png';

declare module '*.jpg';

declare module '*.jpeg';

declare module '*.gif';

declare module '*.md' {
  const content: string;
  export default content;
}

\${serverType === 'koa-next' ? "declare module 'next-url-prettifier';" : ''}
\``;

export const tpl_next_d = {
  tpl
};

export default tpl_engine_init(tpl_next_d, 'tpl');