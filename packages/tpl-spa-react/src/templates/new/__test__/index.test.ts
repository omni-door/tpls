import { expect } from 'chai';
import component_class from '../component_class';
import component_function from '../component_functional';
import component_index from '../index';
import component_readme from '../readme';
import component_stylesheet from '../stylesheet';
import component_test from '../test';

describe('[tpl-spa-react]: component_class template test', function () {
  it('type checking', function () {
    expect(component_class).to.be.a('function');
  });
});

describe('[tpl-spa-react]: component_function template test', function () {
  it('type checking', function () {
    expect(component_function).to.be.a('function');
  });
});

describe('[tpl-spa-react]: component_index template test', function () {
  it('type checking', function () {
    expect(component_index).to.be.a('function');
  });
});

describe('[tpl-spa-react]: component_readme template test', function () {
  it('type checking', function () {
    expect(component_readme).to.be.a('function');
  });
});

describe('[tpl-spa-react]: component_stylesheet template test', function () {
  it('type checking', function () {
    expect(component_stylesheet).to.be.a('function');
  });
});

describe('[tpl-spa-react]: component_test template test', function () {
  it('type checking', function () {
    expect(component_test).to.be.a('function');
  });
});