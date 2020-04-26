import { describe, it } from 'mocha';
import { expect } from 'chai';
import source_declaration from '../declaration';
import source_html from '../html';
import source_index_react from '../index_react';
import source_index_style from '../style';
import source_index_reset from '../reset';

describe('source_declaration template test', function () {
  it('type checking', function () {
    expect(source_declaration).to.be.a('function');
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