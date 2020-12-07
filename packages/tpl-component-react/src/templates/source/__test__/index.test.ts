import { expect } from 'chai';
import source_index from '../index';
import source_declaration from '../declaration';
import source_classnames from '../classnames';

describe('[tpl-component-react]: source_declaration template test', function () {
  it('type checking', function () {
    expect(source_declaration).to.be.a('function');
  });
});

describe('[tpl-component-react]: source_index template test', function () {
  it('type checking', function () {
    expect(source_index).to.be.a('function');
  });
});

describe('[tpl-component-react]: source_classnames template test', function () {
  it('type checking', function () {
    expect(source_classnames).to.be.a('function');
  });
});