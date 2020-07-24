import { describe, it } from 'mocha';
import { expect } from 'chai';
import source_declaration_index from '../declaration_index';
import source_declaration_global from '../declaration_global';
import source_html from '../html';
import source_index_react from '../index_react';
import source_index_style from '../style';
import source_index_reset from '../reset';
import source_index_routes from '../routes';
import source_page_index from '../page';
import source_page_page from '../page/page';
import source_page_page_nest from '../page/page_nest';
import source_page_style from '../page/style';
import source_component_index from '../component';
import source_component_cp from '../component/component';
import source_component_style from '../component/style';

describe('source_declaration_index template test', function () {
  it('type checking', function () {
    expect(source_declaration_index).to.be.a('function');
  });
});

describe('source_declaration_global template test', function () {
  it('type checking', function () {
    expect(source_declaration_global).to.be.a('function');
  });
});

describe('source_html template test', function () {
  it('type checking', function () {
    expect(source_html).to.be.a('function');
  });
});

describe('source_index_react template test', function () {
  it('type checking', function () {
    expect(source_index_react).to.be.a('function');
  });
});

describe('source_index_style template test', function () {
  it('type checking', function () {
    expect(source_index_style).to.be.a('function');
  });
});

describe('source_index_reset template test', function () {
  it('type checking', function () {
    expect(source_index_reset).to.be.a('function');
  });
});

describe('source_index_routes template test', function () {
  it('type checking', function () {
    expect(source_index_routes).to.be.a('function');
  });
});

describe('source_page_index template test', function () {
  it('type checking', function () {
    expect(source_page_index).to.be.a('function');
  });
});

describe('source_page_page template test', function () {
  it('type checking', function () {
    expect(source_page_page).to.be.a('function');
  });
});

describe('source_page_page_nest template test', function () {
  it('type checking', function () {
    expect(source_page_page_nest).to.be.a('function');
  });
});

describe('source_page_style template test', function () {
  it('type checking', function () {
    expect(source_page_style).to.be.a('function');
  });
});

describe('source_component_index template test', function () {
  it('type checking', function () {
    expect(source_component_index).to.be.a('function');
  });
});

describe('source_component_cp template test', function () {
  it('type checking', function () {
    expect(source_component_cp).to.be.a('function');
  });
});

describe('source_component_style template test', function () {
  it('type checking', function () {
    expect(source_component_style).to.be.a('function');
  });
});