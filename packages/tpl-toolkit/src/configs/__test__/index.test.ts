import { describe, it } from 'mocha';
import { expect } from 'chai';
import { devDependencies as devDependencies_stable } from '../dependencies_stable_map';
import { devDependencies } from '../dependencies';

describe('dependencies_stable_map test', function () {
  it('type checking', function () {
    expect(devDependencies_stable).to.be.an('object');
  });
});

describe('dependencies test', function () {
  it('type checking', function () {
    expect(devDependencies).to.be.a('function');
  });
});