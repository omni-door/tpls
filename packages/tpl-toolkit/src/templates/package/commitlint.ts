const tpl = 
`\`
"lint-staged": {
  \${eslint || prettier ? \`"src/**/*.{js,jsx,ts,tsx}": [
    \${eslint ? \`"\${script_eslint_fix}"\${prettier ? ',' : ''}\` : ''}
    \${prettier ? \`"\${script_prettier_fix}"\` : ''}
  ]\` : ''}
},
\``;

export default tpl;