import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`.layout {
  display: block;
}

.layout-header {
  width: 100vw;
  height: 15px;
  padding: 0 20px;
  overflow: hidden;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.layout-header-nav{
  width: 100%;
  height: 100%;
  text-align: center;
}

.layout-header-nav a {
  margin-left: 10px;
  font-size: 12px;
}

.layout-content {
  padding-top: 30vh;
  min-height: 88vh;
}

.layout-footer {
  width: 100vw;
  height: 15px;
  padding: 0;
  font-size: 4px;
  line-height: 15px;
  text-align: center;
  background-color: rgb(250, 250, 250);
}

@media (max-width: 1024px) {
  .layout-header {
    min-width: 320px;
    height: 50px;
    padding: 0 2vw;
  }
  
  .layout-header-nav a {
    font-size: 16px;
  }
  
  .layout-footer {
    height: 30px;
    font-size: 10px;
    line-height: 30px;
  }
}
\``;

export const tpl_src_component_layout_style = {
  tpl
};

export default tpl_engine_init(tpl_src_component_layout_style, 'tpl');