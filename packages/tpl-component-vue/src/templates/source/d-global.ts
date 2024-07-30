import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`declare module '*.css';

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

declare module '*.vue' {
  import type { App, defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  };
  export default component;
}
\``;

export const tpl_src_d_global = {
  tpl
};

export default tplEngineInit(tpl_src_d_global, 'tpl');