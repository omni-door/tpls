import { expect } from 'chai';
import { devDependencies as devDependencies_stable } from '../dependencies_stable_map';
import { devDependencies } from '../dependencies';

describe('[tpl-toolkit]: dependencies_stable_map test', function () {
  it('type checking', function () {
    expect(devDependencies_stable).to.be.an('object');
  });
});

describe('[tpl-toolkit]: dependencies test', function () {
  it('type checking', function () {
    expect(devDependencies).to.be.a('function');
  });
});