import { expect } from 'chai';
import component_index from '../index';
import component_readme from '../readme';
import component_test from '../test';

describe('[tpl-toolkit]: component_index template test', function () {
  it('type checking', function () {
    expect(component_index).to.be.a('function');
  });
});

describe('[tpl-toolkit]: component_readme template test', function () {
  it('type checking', function () {
    expect(component_readme).to.be.a('function');
  });
});

describe('[tpl-toolkit]: component_test template test', function () {
  it('type checking', function () {
    expect(component_test).to.be.a('function');
  });
});