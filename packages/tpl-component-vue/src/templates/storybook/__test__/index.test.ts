import { expect } from 'chai';
import storybook_addons from '../addons';
import storybook_config from '../config';
import storybook_manager from '../addons';
import storybook_webpack from '../webpack';
import storybook_theme from '../theme';

describe('[tpl-component-react]: storybook_addons template test', function () {
  it('type checking', function () {
    expect(storybook_addons).to.be.a('function');
  });
});

describe('[tpl-component-react]: storybook_config template test', function () {
  it('type checking', function () {
    expect(storybook_config).to.be.a('function');
  });
});

describe('[tpl-component-react]: storybook_manager template test', function () {
  it('type checking', function () {
    expect(storybook_manager).to.be.a('function');
  });
});

describe('[tpl-component-react]: storybook_webpack template test', function () {
  it('type checking', function () {
    expect(storybook_webpack).to.be.a('function');
  });
});

describe('[tpl-component-react]: storybook_theme template test', function () {
  it('type checking', function () {
    expect(storybook_theme).to.be.a('function');
  });
});