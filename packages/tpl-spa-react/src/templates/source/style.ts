import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`.main{
  position: relative;
  height: 100vh;
  padding-top: 40vh;
  color: white;
  font-weight: 600;
  font-size: 60px;
  font-family: sans-serif;
  text-align: center;
  background-color: rgba(170, 30, 38, 1);
}

.main-subtitle{
  display: block;
  margin-left: 20px;
  padding-left: 50vw;
  font-size: 20px;
}

.main-footer{
  position: absolute;
  bottom: 0;
  left: 50%;
  font-size: 16px;
  transform: translate(-50%, 0);
}
\``;

export const tpl_src_style = {
  tpl
};

export default tpl_engine_init(tpl_src_style, 'tpl');