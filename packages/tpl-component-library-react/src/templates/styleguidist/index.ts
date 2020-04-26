import { tpl_engine_init } from '@omni-door/utils';
import rules_style_css from './rules_style_css';
import rules_style_less from './rules_style_less';
import rules_style_scss from './rules_style_scss';
import rules_style_all from './rules_style_all';

const tpl = 
`\`\${use_strict}

const path = require('path')
const { version } = require('./package')

module.exports = {
  components: 'src/components/[A-Z]*/index.ts',
  defaultExample: true,
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  propsParser: \${
    ts
      ? "require('react-docgen-typescript').withDefaultConfig({ propFilter: { skipPropsWithoutDoc: true } }).parse"
      : "(filePath, source, resolver, handlers) => require('react-docgen').parse(source, resolver, handlers)"
  },
  moduleAliases: {
		'rsg-example': path.resolve(__dirname, 'src'),
	},
  ribbon: {
    url: '',
    text: 'Fork me on GitLab'
  },
  version,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          loader: 'babel-loader',
					exclude: /node_modules/
        },
        \${alter_style({
          css: 'rules_style_css',
          less: 'rules_style_less',
          scss: 'rules_style_scss',
          all: 'rules_style_all',
        })}
      ]
    },
    resolve: {
      extensions: [\${ts ? '".ts", ".tsx", ' : ''}".js", ".jsx", \${style ? (style === 'css' ? '".css"' : (style === 'less' ? '".less", ".css"' : style === 'scss' ? '".scss", ".css", ".sass"' : '".scss", ".less", ".css", ".sass"')) : ''}]
    }
  }
};
\``;

export const tpl_styleguidist = {
  tpl,
  rules_style_css,
  rules_style_less,
  rules_style_scss,
  rules_style_all
};

export default tpl_engine_init(tpl_styleguidist, 'tpl');