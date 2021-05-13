import { expect } from 'chai';
import type { PROJECT_TYPE, STRATEGY, STYLE, LAYOUT } from '@omni-door/utils';
import tpl_babel from '../babel';
import tpl_commitlint from '../commitlint';
import tpl_editor from '../editor';
import tpl_eslint from '../eslint';
import tpl_eslintignore from '../ignore/eslintignore';
import tpl_gitignore from '../ignore/gitignore';
import tpl_index from '../index';
import tpl_jest from '../jest';
import tpl_npmignore from '../ignore/npmignore';
import tpl_prettierignore from '../ignore/prettierignore';
import tpl_omni from '../omni';
import tpl_package from '../package';
import tpl_postcss from '../postcss';
import tpl_prettier from '../prettier';
import tpl_readme from '../readme';
import tpl_stylelint from '../stylelint';
import tpl_tsconfig from '../tsconfig';
import tpl_vscode from '../vsc';
import component from '../new/component';
import component_index from '../new/index';
import component_readme from '../new/readme';
import component_style from '../new/stylesheet';
import component_test from '../new/test';

const params_entire = { 
  project_type: 'spa-vue' as PROJECT_TYPE,
  project_name: 'test-project',
  ts: false,
  test: true,
  eslint: true,
  prettier: true,
  layout: 'viewport' as LAYOUT,
  commitlint: true,
  style: 'less' as STYLE,
  stylelint: true,
  strategy: 'stable' as STRATEGY,
  configFileName: 'omni.config.js'
};

describe('[tpl-spa-vue]: tpl_babel template test', function () {
  it('type checking', function () {
    expect(tpl_babel).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: tpl_commitlint template test', function () {
  it('type checking', function () {
    expect(tpl_commitlint).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: tpl_editor template test', function () {
  it('type checking', function () {
    expect(tpl_editor).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: tpl_eslint template test', function () {
  it('type checking', function () {
    expect(tpl_eslint).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: tpl_eslintignore template test', function () {
  it('type checking', function () {
    expect(tpl_eslintignore).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: tpl_gitignore template test', function () {
  it('type checking', function () {
    expect(tpl_gitignore).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: tpl_index template test', function () {
  it('type checking', function () {
    expect(tpl_index).to.be.a('object');
  });
});

describe('[tpl-spa-vue]: tpl_jest template test', function () {
  it('type checking', function () {
    expect(tpl_jest).to.be.a('function');
    const data = tpl_jest(params_entire);
    expect(data).to.be.a('string');
  });
});

describe('[tpl-spa-vue]: tpl_npmignore template test', function () {
  it('type checking', function () {
    expect(tpl_npmignore).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: tpl_prettierignore template test', function () {
  it('type checking', function () {
    expect(tpl_prettierignore).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: tpl_omni template test', function () {
  it('type checking', function () {
    expect(tpl_omni).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: tpl_package template test', function () {
  it('type checking', function () {
    expect(tpl_package).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: tpl_postcss template test', function () {
  it('type checking', function () {
    expect(tpl_postcss).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: tpl_prettier template test', function () {
  it('type checking', function () {
    expect(tpl_prettier).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: tpl_readme template test', function () {
  it('type checking', function () {
    expect(tpl_readme).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: tpl_vscode template test', function () {
  it('type checking', function () {
    expect(tpl_vscode).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: tpl_stylelint template test', function () {
  it('type checking', function () {
    expect(tpl_stylelint).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: tpl_tsconfig template test', function () {
  it('type checking', function () {
    expect(tpl_tsconfig).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: component template test', function () {
  it('type checking', function () {
    expect(component).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: component_index template test', function () {
  it('type checking', function () {
    expect(component_index).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: component_readme template test', function () {
  it('type checking', function () {
    expect(component_readme).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: component_style template test', function () {
  it('type checking', function () {
    expect(component_style).to.be.a('function');
  });
});

describe('[tpl-spa-vue]: component_test template test', function () {
  it('type checking', function () {
    expect(component_test).to.be.a('function');
  });
});