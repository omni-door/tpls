import { expect } from 'chai';
import storybook_main from '../main';
import storybook_preview from '../preview';
import storybook_manager from '../manager';
import storybook_theme from '../theme';

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

describe('[tpl-component-react]: storybook_manager template test', function () {
  it('type checking', function () {
    expect(storybook_manager).to.be.a('function');
  });
});

describe('[tpl-component-react]: storybook_theme template test', function () {
  it('type checking', function () {
    expect(storybook_theme).to.be.a('function');
  });
});