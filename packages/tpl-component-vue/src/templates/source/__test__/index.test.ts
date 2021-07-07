import { expect } from 'chai';
import source_index from '../index';
import source_d_global from '../d-global';
import source_d_shim_tsx from '../d-shim-tsx';
import source_classnames from '../classnames';

describe('[tpl-component-vue]: source_d_global template test', function () {
  it('type checking', function () {
    expect(source_d_global).to.be.a('function');
  });
});

describe('[tpl-component-vue]: source_d_shim_tsx template test', function () {
  it('type checking', function () {
    expect(source_d_shim_tsx).to.be.a('function');
  });
});

describe('[tpl-component-vue]: source_index template test', function () {
  it('type checking', function () {
    expect(source_index).to.be.a('function');
  });
});

describe('[tpl-component-vue]: source_classnames template test', function () {
  it('type checking', function () {
    expect(source_classnames).to.be.a('function');
  });
});