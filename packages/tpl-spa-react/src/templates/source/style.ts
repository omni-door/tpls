import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`.main {
  position: relative;
  height: 100vh;
  padding-top: 10vh;
  color: white;
  font-weight: 600;
  font-size: 16px;
  font-family: sans-serif;
  text-align: center;
  background-color: rgba(170, 30, 38, 1);
}

.main-btn {
  position: absolute;
  left: 50%;
  width: 100px;
  height: 25px;
  line-height: 25px;
  background: gray;
  border-radius: 10px;
  transform: translate(-50%, 0);
}

.main-btn-home {
  top: 50%;
}

.main-btn-detail {
  top: 60%;
}

.main-btn-detail-1 {
  top: 70%;
}

.main-btn-detail-2 {
  top: 80%;
}

.main-footer {
  position: absolute;
  bottom: 2vh;
  left: 50%;
  transform: translate(-50%, 0);
}
\``;

export const tpl_src_style = {
  tpl
};

export default tpl_engine_init(tpl_src_style, 'tpl');