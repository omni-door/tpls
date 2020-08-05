import { expect } from 'chai';
import component_class from '../class_component';
import component_function from '../functional_component';
import component_index from '../index';
import component_interface from '../interface';
import component_mdx from '../mdx';
import component_readme from '../readme';
import component_stories from '../stories';
import component_style from '../style';
import component_stylesheet from '../stylesheet';
import component_test from '../test';

describe('[tpl-component-react]: component_class template test', function () {
  it('type checking', function () {
    expect(component_class).to.be.a('function');
  });
});

describe('[tpl-component-react]: component_function template test', function () {
  it('type checking', function () {
    expect(component_function).to.be.a('function');
  });
});

describe('[tpl-component-react]: component_index template test', function () {
  it('type checking', function () {
    expect(component_index).to.be.a('function');
  });
});

describe('[tpl-component-react]: component_interface template test', function () {
  it('type checking', function () {
    expect(component_interface).to.be.a('function');
  });
});

describe('[tpl-component-react]: component_mdx template test', function () {
  it('type checking', function () {
    expect(component_mdx).to.be.a('function');
  });
});

describe('[tpl-component-react]: component_readme template test', function () {
  it('type checking', function () {
    expect(component_readme).to.be.a('function');
  });
});

describe('[tpl-component-react]: component_stories template test', function () {
  it('type checking', function () {
    expect(component_stories).to.be.a('function');
  });
});

describe('[tpl-component-react]: component_style template test', function () {
  it('type checking', function () {
    expect(component_style).to.be.a('function');
  });
});

describe('[tpl-component-react]: component_stylesheet template test', function () {
  it('type checking', function () {
    expect(component_stylesheet).to.be.a('function');
  });
});

describe('[tpl-component-react]: component_test template test', function () {
  it('type checking', function () {
    expect(component_test).to.be.a('function');
  });
});