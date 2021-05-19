import { expect } from 'chai';
import tpl_index from '../index';
import tpl_omni from '../omni';
import tpl_package from '../package';
import tpl_readme from '../readme';
import tpl_readme_cn from '../readme/index.zh-CN';
import tpl_vscode from '../vsc';
import tpl_babel from '../babel';
import tpl_commitlint from '../commitlint';
import tpl_editor from '../editor';
import tpl_eslint from '../eslint';
import tpl_ignore_eslint from '../ignore/eslintignore';
import tpl_ignore_git from '../ignore/gitignore';
import tpl_ignore_prettier from '../ignore/prettierignore';
import tpl_jest from '../jest';
import tpl_next_config from '../next/next-config';
import tpl_next_d from '../next/next-d';
import tpl_postcss from '../postcss';
import tpl_prettier from '../prettier';
import tpl_stylelint from '../stylelint';
import tpl_tsconfig from '../tsconfig';
import tpl_webpack from '../webpack';

describe('[tpl-ssr-react]: tpl_index template test', function () {
  it('type checking', function () {
    expect(tpl_index).to.be.a('object');
  });
});

describe('[tpl-ssr-react]: tpl_omni template test', function () {
  it('type checking', function () {
    expect(tpl_omni).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_package template test', function () {
  it('type checking', function () {
    expect(tpl_package).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_readme template test', function () {
  it('type checking', function () {
    expect(tpl_readme).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_readme_cn template test', function () {
  it('type checking', function () {
    expect(tpl_readme_cn).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_vscode template test', function () {
  it('type checking', function () {
    expect(tpl_vscode).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_babel template test', function () {
  it('type checking', function () {
    expect(tpl_babel).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_commitlint template test', function () {
  it('type checking', function () {
    expect(tpl_commitlint).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_editor template test', function () {
  it('type checking', function () {
    expect(tpl_editor).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_eslint template test', function () {
  it('type checking', function () {
    expect(tpl_eslint).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_ignore_eslint template test', function () {
  it('type checking', function () {
    expect(tpl_ignore_eslint).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_ignore_git template test', function () {
  it('type checking', function () {
    expect(tpl_ignore_git).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_ignore_prettier template test', function () {
  it('type checking', function () {
    expect(tpl_ignore_prettier).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_jest template test', function () {
  it('type checking', function () {
    expect(tpl_jest).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_next_config template test', function () {
  it('type checking', function () {
    expect(tpl_next_config).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_next_d template test', function () {
  it('type checking', function () {
    expect(tpl_next_d).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_postcss template test', function () {
  it('type checking', function () {
    expect(tpl_postcss).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_prettier template test', function () {
  it('type checking', function () {
    expect(tpl_prettier).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_stylelint template test', function () {
  it('type checking', function () {
    expect(tpl_stylelint).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_tsconfig template test', function () {
  it('type checking', function () {
    expect(tpl_tsconfig).to.be.a('function');
  });
});

describe('[tpl-ssr-react]: tpl_webpack template test', function () {
  it('type checking', function () {
    expect(tpl_webpack).to.be.a('function');
  });
});