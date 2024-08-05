import { tplEngineInit } from '@omni-door/utils';
import plugins_scss from './plugins_scss';
import plugins_less from './plugins_scss';
import rules_scss from './rules_scss';
import extends_scss from './extends_scss';
import extends_less from './extends_less';

const tpl = 
`\`\${use_strict}

module.exports = {
	extends: [
		'stylelint-config-standard',\${alter_style({ all: 'extends_scss', scss: 'extends_scss' })}\${alter_style({ all: 'extends_less', less: 'extends_less' })}
		'stylelint-config-css-modules',
		'stylelint-config-rational-order'
	],
	plugins: [
		'stylelint-order',\${alter_style({ all: 'plugins_scss', scss: 'plugins_scss' })}\${alter_style({ all: 'plugins_less', less: 'plugins_less' })}
		'stylelint-declaration-block-no-ignored-properties'
	],
	rules: {
		'no-descending-specificity': null,\${alter_style({ all: 'rules_scss', scss: 'rules_scss' })}
		'selector-class-pattern': null,
		'plugin/declaration-block-no-ignored-properties': true
	}
};
\``;

export const tpl_stylelint = {
	tpl,
	extends_scss,
	extends_less,
  plugins_scss,
	plugins_less,
  rules_scss
};

export default tplEngineInit(tpl_stylelint, 'tpl');