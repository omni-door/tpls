import { describe, it } from 'mocha';
import { expect } from 'chai';
import tpl_babel from '../babel';
import tpl_commitlint from '../commitlint';
import tpl_eslint from '../eslint';
import tpl_eslintignore from '../ignore/eslintignore';
import tpl_gitignore from '../ignore/gitignore';
import tpl_index from '../index';
import tpl_jest from '../jest';
import tpl_npmignore from '../ignore/npmignore';
import tpl_prettierignore from '../ignore/prettierignore';
import tpl_omni from '../omni';
import tpl_package from '../package';
import tpl_prettier from '../prettier';
import tpl_readme from '../readme';
import tpl_stylelint from '../stylelint';
import tpl_tsconfig from '../tsconfig';

describe('tpl_babel template test', function () {
  it('type checking', function () {
    expect(tpl_babel).to.be.a('function');
  });
});

describe('tpl_commitlint template test', function () {
  it('type checking', function () {
    expect(tpl_commitlint).to.be.a('function');
  });
});

describe('tpl_eslint template test', function () {
  it('type checking', function () {
    expect(tpl_eslint).to.be.a('function');
  });
});

describe('tpl_eslintignore template test', function () {
  it('type checking', function () {
    expect(tpl_eslintignore).to.be.a('function');
  });
});

describe('tpl_gitignore template test', function () {
  it('type checking', function () {
    expect(tpl_gitignore).to.be.a('function');
  });
});

describe('tpl_index template test', function () {
  it('type checking', function () {
    expect(tpl_index).to.be.a('object');
  });
});

describe('tpl_jest template test', function () {
  it('type checking', function () {
    expect(tpl_jest).to.be.a('function');
  });
});

describe('tpl_npmignore template test', function () {
  it('type checking', function () {
    expect(tpl_npmignore).to.be.a('function');
  });
});

describe('tpl_prettierignore template test', function () {
  it('type checking', function () {
    expect(tpl_prettierignore).to.be.a('function');
  });
});

describe('tpl_omni template test', function () {
  it('type checking', function () {
    expect(tpl_omni).to.be.a('function');
  });
});

describe('tpl_package template test', function () {
  it('type checking', function () {
    expect(tpl_package).to.be.a('function');
  });
});

describe('tpl_prettier template test', function () {
  it('type checking', function () {
    expect(tpl_prettier).to.be.a('function');
  });
});

describe('tpl_readme template test', function () {
  it('type checking', function () {
    expect(tpl_readme).to.be.a('function');
  });
});

describe('tpl_stylelint template test', function () {
  it('type checking', function () {
    expect(tpl_stylelint).to.be.a('function');
  });
});

describe('tpl_tsconfig template test', function () {
  it('type checking', function () {
    expect(tpl_tsconfig).to.be.a('function');
  });
});