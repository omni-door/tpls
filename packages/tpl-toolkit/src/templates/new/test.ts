import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import 'mocha';
import { expect } from 'chai';
import \${componentName} from '../';

describe('\${componentName} test', function () {
  it('\${componentName} is a function', function () {
    expect(\${componentName}).to.be.a('function');
  });
});
\``;

export const tpl_new_test = {
  tpl
};

export default tplEngineNew(tpl_new_test, 'tpl');

