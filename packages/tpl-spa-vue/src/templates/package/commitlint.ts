const tpl = 
`\`
"lint-staged": {
  \${eslint || prettier ? \`"src/**/*.{js,jsx,ts,tsx,vue}": [
    \${eslint ? \`"\${script_eslint_fix}"\${prettier ? ',' : ''}\` : ''}
    \${prettier ? \`"\${script_prettier_fix}"\` : ''}
  ]\${stylelint || prettier ? ',' : ''}\` : ''}
  \${stylelint || prettier ? \`"src/**/*.{css,scss,sass,less}": [
    \${stylelint ? \`"\${script_stylelint_fix}"\${prettier ? ',' : ''}\` : ''}
    \${prettier ? \`"\${script_prettier_fix}"\` : ''}
  ]\` : ''}
},
\``;

export default tpl;