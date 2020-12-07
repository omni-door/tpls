import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`export function getTs () {
  return (Date.now && +Date.now()) || new Date().getTime();
}

export default getTs;
\``;

export const tpl_src_get_ts = {
  tpl
};

export default tpl_engine_init(tpl_src_get_ts, 'tpl');