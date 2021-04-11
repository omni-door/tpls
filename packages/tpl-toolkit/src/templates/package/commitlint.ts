const tpl = 
`\`
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
    "pre-push": "\${
      (eslint || prettier) && test
        ? 'npm run lint && npm run test:headless'
        : (eslint || prettier)
            ? 'npm run lint'
            : test
              ? 'npm run test:headless'
              : ''}",
    "commit-msg": "npm run lint:commit"
  }
},
"lint-staged": {
  \${eslint || prettier ? \`"src/**/*.{js,jsx,ts,tsx}": [
    \${eslint ? \`"\${script_eslint_fix}"\${prettier ? ',' : ''}\` : ''}
    \${prettier ? \`"\${script_prettier_fix}"\` : ''}
  ]\` : ''}
},
\``;

export default tpl;