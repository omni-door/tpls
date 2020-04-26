import { describe, it } from 'mocha';
import { expect } from 'chai';
import source_declaration from '../declaration';
import source_index from '../index';

describe('source_declaration template test', function () {
  it('type checking', function () {
    expect(source_declaration).to.be.a('function');
  });
});

describe('source_index template test', function () {
  it('type checking', function () {
    expect(source_index).to.be.a('function');
  });
});