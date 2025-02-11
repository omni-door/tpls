import { tplEngineNew } from '@omni-door/utils';

const tpl = 
`\`import 'jsdom-global/register';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { \${componentName} } from '../index';

const originalConsoleError = console.error;
console.error = (message, ...optionalParams) => {
  if (
    message.includes('Could not parse CSS stylesheet') ||
    message.includes('findDOMNode is deprecated and will be removed')
  ) {
      return;
  }
  originalConsoleError(message, ...optionalParams);
};

describe('\${componentName}', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <\${componentName} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('simulate events', async () => {
    const onClick = jest.fn(); 
    render(
      <\${componentName} data-testid='id-\${componentName.toLowerCase()}' onClick={onClick} />
    );
    const user = userEvent.setup();
    await user.click(screen.getByTestId('id-\${componentName.toLowerCase()}'))
    expect(onClick).toHaveBeenCalled();
  });
});
\``;

export const tpl_new_test = {
  tpl
};

export default tplEngineNew(tpl_new_test, 'tpl');

