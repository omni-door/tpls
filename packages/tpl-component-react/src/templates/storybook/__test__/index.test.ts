import { expect } from 'chai';
import storybook_main from '../main';
import storybook_preview from '../preview';
import storybook_webpack from '../webpack';

describe('[tpl-component-react]: storybook_main template test', function () {
  it('type checking', function () {
    expect(storybook_main).to.be.a('function');
  });
});

describe('[tpl-component-react]: storybook_preview template test', function () {
  it('type checking', function () {
    expect(storybook_preview).to.be.a('function');
  });
});

describe('[tpl-component-react]: storybook_webpack template test', function () {
  it('type checking', function () {
    expect(storybook_webpack).to.be.a('function');
  });
});