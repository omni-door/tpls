import { expect } from 'chai';
import source_index_app from '../app_vue';
import source_declaration_global from '../declaration_global';
import source_html from '../html';
import source_index_vue from '../index_vue';
import source_index_style from '../style';
import source_index_reset from '../reset';
import source_index_routes from '../routes';
import source_page_index from '../page';
import source_page_page from '../page/page';
import source_page_style from '../page/style';
import source_component_index from '../component';
import source_component_cp from '../component/component';
import source_component_style from '../component/style';
import source_component_test from '../component/test';

describe('[tpl-spa-react]: source_index_app template test', function () {
  it('type checking', function () {
    expect(source_index_app).to.be.a('function');
  });
});

describe('[tpl-spa-react]: source_declaration_global template test', function () {
  it('type checking', function () {
    expect(source_declaration_global).to.be.a('function');
  });
});

describe('[tpl-spa-react]: source_html template test', function () {
  it('type checking', function () {
    expect(source_html).to.be.a('function');
  });
});

describe('[tpl-spa-react]: source_index_vue template test', function () {
  it('type checking', function () {
    expect(source_index_vue).to.be.a('function');
  });
});

describe('[tpl-spa-react]: source_index_style template test', function () {
  it('type checking', function () {
    expect(source_index_style).to.be.a('function');
  });
});

describe('[tpl-spa-react]: source_index_reset template test', function () {
  it('type checking', function () {
    expect(source_index_reset).to.be.a('function');
  });
});

describe('[tpl-spa-react]: source_index_routes template test', function () {
  it('type checking', function () {
    expect(source_index_routes).to.be.a('function');
  });
});

describe('[tpl-spa-react]: source_page_index template test', function () {
  it('type checking', function () {
    expect(source_page_index).to.be.a('function');
  });
});

describe('[tpl-spa-react]: source_page_page template test', function () {
  it('type checking', function () {
    expect(source_page_page).to.be.a('function');
  });
});

describe('[tpl-spa-react]: source_page_style template test', function () {
  it('type checking', function () {
    expect(source_page_style).to.be.a('function');
  });
});

describe('[tpl-spa-react]: source_component_index template test', function () {
  it('type checking', function () {
    expect(source_component_index).to.be.a('function');
  });
});

describe('[tpl-spa-react]: source_component_cp template test', function () {
  it('type checking', function () {
    expect(source_component_cp).to.be.a('function');
  });
});

describe('[tpl-spa-react]: source_component_style template test', function () {
  it('type checking', function () {
    expect(source_component_style).to.be.a('function');
  });
});

describe('[tpl-spa-react]: source_component_test template test', function () {
  it('type checking', function () {
    expect(source_component_test).to.be.a('function');
  });
});