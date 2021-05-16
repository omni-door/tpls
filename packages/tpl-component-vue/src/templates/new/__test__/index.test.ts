import { expect } from 'chai';
import component from '../component';
import component_index from '../index';
import component_readme from '../readme';
import component_stories from '../stories';
import component_style from '../style';
import component_stylesheet from '../stylesheet';
import component_test from '../test';

describe('[tpl-component-vue]: component template test', function () {
  it('type checking', function () {
    expect(component).to.be.a('function');
  });
});

describe('[tpl-component-vue]: component_index template test', function () {
  it('type checking', function () {
    expect(component_index).to.be.a('function');
  });
});

describe('[tpl-component-vue]: component_readme template test', function () {
  it('type checking', function () {
    expect(component_readme).to.be.a('function');
  });
});

describe('[tpl-component-vue]: component_stories template test', function () {
  it('type checking', function () {
    expect(component_stories).to.be.a('function');
  });
});

describe('[tpl-component-vue]: component_style template test', function () {
  it('type checking', function () {
    expect(component_style).to.be.a('function');
  });
});

describe('[tpl-component-vue]: component_stylesheet template test', function () {
  it('type checking', function () {
    expect(component_stylesheet).to.be.a('function');
  });
});

describe('[tpl-component-vue]: component_test template test', function () {
  it('type checking', function () {
    expect(component_test).to.be.a('function');
  });
});