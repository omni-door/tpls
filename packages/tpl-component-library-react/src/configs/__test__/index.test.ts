import { describe, it } from 'mocha';
import { expect } from 'chai';
import { dependencies as dependencies_stable, devDependencies as devDependencies_stable } from '../dependencies_stable_map';
import { dependencies, devDependencies } from '../dependencies';

describe('dependencies_stable_map test', function () {
  it('type checking', function () {
    expect(dependencies_stable).to.be.an('object');
    expect(devDependencies_stable).to.be.an('object');
  });
});

describe('dependencies test', function () {
  it('type checking', function () {
    expect(dependencies).to.be.a('function');
    expect(devDependencies).to.be.a('function');
  });
});