const tpl = 
`\`
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
    "pre-push": \${
      (eslint || stylelint || prettier) && test
        ? '"npm run lint && npm run test"'
        : (eslint || stylelint || prettier)
            ? '"npm run lint"'
            : test
              ? '"npm run test"'
              : ''},
    "commit-msg": "npm run lint:commit"
  }
},
"lint-staged": {
  \${eslint || prettier ? \`"src/**/*.{js,jsx,ts,tsx}": [
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