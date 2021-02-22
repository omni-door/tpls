import { tplEngineInit } from '@omni-door/utils';
import plugins_scss from './plugins_scss';
import rules_scss from './rules_scss';
import extends_prettier from './extends_prettier';

const tpl = 
`\`\${use_strict}

module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-css-modules',\${alter('prettier', 'extends_prettier')}
		'stylelint-config-rational-order'
	],
	plugins: [
		'stylelint-order',\${alter_style({ all: 'plugins_scss', scss: 'plugins_scss' })}
		'stylelint-declaration-block-no-ignored-properties'
	],
	rules: {
		'no-descending-specificity': null,\${alter_style({ all: 'rules_scss', scss: 'rules_scss' })}
		'plugin/declaration-block-no-ignored-properties': true
	}
};
\``;

export const tpl_stylelint = {
	tpl,
	extends_prettier,
  plugins_scss,
  rules_scss
};

export default tplEngineInit(tpl_stylelint, 'tpl');