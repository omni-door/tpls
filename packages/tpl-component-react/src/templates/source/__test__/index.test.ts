import { expect } from 'chai';
import source_declaration from '../declaration';
import source_index from '../index';

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