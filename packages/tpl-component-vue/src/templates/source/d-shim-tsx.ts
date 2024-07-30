import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`import type { VNode, ComponentPublicInstance } from 'vue';

declare global {
  namespace JSX {
    interface Element extends VNode { }
    interface ElementClass extends ComponentPublicInstance { }
    interface ElementAttributesProperty {
      $props: any;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
\``;

export const tpl_src_d_shim_tsx = {
  tpl
};

export default tplEngineInit(tpl_src_d_shim_tsx, 'tpl');