import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`.sider {
  text-align: center;
  box-shadow: inset 0 -2px 4px #fafafa,
    0 0 20px rgba(0, 0, 0, 0.2);
}

.main {
  position: relative;
  height: 100vh;
  padding: 10px 20px 0;
}

.main-header {
  font-size: 16px;
  text-align: center;
  background-color: #f5f5f5;
  box-shadow: inset 0 -2px 4px #fafafa,
    0 0 20px rgba(0, 0, 0, 0.2);
}

.main-content {
  margin: 20px 0;
  padding-top: 30vh;
  color: white;
  font-weight: 600;
  font-size: 60px;
  font-family: sans-serif;
  text-align: center;
  background-color: rgba(170, 30, 38, 1);
}

.main-footer {
  font-size: 16px;
  text-align: center;
  background-color: #f5f5f5;
  box-shadow: inset 0 -2px 4px #fafafa,
    0 0 20px rgba(0, 0, 0, 0.2);
}
\``;

export const tpl_src_style = {
  tpl
};

export default tplEngineInit(tpl_src_style, 'tpl');