import { expect } from 'chai';
import source_index_reset from '../reset';
import source_index_routes from '../routes';
import source_page_index from '../page';
import source_page_app from '../page/_app';
import source_component_index from '../component';
import source_component_cp from '../component/component';
import source_component_style from '../component/style';
import source_component_layout from '../component/layout';
import source_component_layout_style from '../component/style-layout';
import source_component_link from '../component/link';
import source_utils_mapctx from '../utils/mapCtxToProps';
import source_utils_params from '../utils/paramsToQueryString';

describe('[tpl-ssr-react]: source_index_reset template test', function () {
  it('type checking', function () {
    expect(source_index_reset).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: source_index_routes template test', function () {
  it('type checking', function () {
    expect(source_index_routes).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: source_page_index template test', function () {
  it('type checking', function () {
    expect(source_page_index).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: source_page_app template test', function () {
  it('type checking', function () {
    expect(source_page_app).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: source_component_index template test', function () {
  it('type checking', function () {
    expect(source_component_index).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: source_component_cp template test', function () {
  it('type checking', function () {
    expect(source_component_cp).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: source_component_style template test', function () {
  it('type checking', function () {
    expect(source_component_style).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: source_component_layout template test', function () {
  it('type checking', function () {
    expect(source_component_layout).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: source_component_layout_style template test', function () {
  it('type checking', function () {
    expect(source_component_layout_style).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: source_component_link template test', function () {
  it('type checking', function () {
    expect(source_component_link).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: source_utils_mapctx template test', function () {
  it('type checking', function () {
    expect(source_utils_mapctx).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: source_utils_params template test', function () {
  it('type checking', function () {
    expect(source_utils_params).to.be.a('function');
  });
});