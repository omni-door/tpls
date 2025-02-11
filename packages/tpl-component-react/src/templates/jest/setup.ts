import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
\``;

export const tpl_jest_setup = {
  tpl
};

export default tplEngineInit(tpl_jest_setup, 'tpl');