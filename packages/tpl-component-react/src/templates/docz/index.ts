import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

module.exports = {
  title: '\${project_name}',
  typescript: \${ts ? true : false},
  src: './src/',
  files: '**/*.{md,markdown,mdx}'
};
\``;

export const tpl_docz = {
  tpl
};

export default tpl_engine_init(tpl_docz, 'tpl');