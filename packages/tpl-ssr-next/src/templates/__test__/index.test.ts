import { describe, it } from 'mocha';
import { expect } from 'chai';
import tpl_index from '../index';
import tpl_omni from '../omni';
import tpl_package from '../package';
import tpl_readme from '../readme';
import component_readme from '../new/readme';

describe('tpl_index template test', function () {
  it('type checking', function () {
    expect(tpl_index).to.be.a('object');
  });
});

describe('tpl_omni template test', function () {
  it('type checking', function () {
    expect(tpl_omni).to.be.a('function');
  });
});

describe('tpl_package template test', function () {
  it('type checking', function () {
    expect(tpl_package).to.be.a('function');
  });
});

describe('tpl_readme template test', function () {
  it('type checking', function () {
    expect(tpl_readme).to.be.a('function');
  });
});

describe('component_readme template test', function () {
  it('type checking', function () {
    expect(component_readme).to.be.a('function');
  });
});
