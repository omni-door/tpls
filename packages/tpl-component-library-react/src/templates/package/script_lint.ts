const tpl = 
`\`
    "lint": "\${prettier ? \`\${script_prettier}\${eslint || stylelint ? ' && ' : ''}\` : ''}\${eslint ? \`\${script_eslint}\${stylelint ? ' && ' : ''}\` : ''}\${stylelint ? \`\${script_stylelint}\` : ''}",
    "lint:fix": "\${prettier ? \`\${script_prettier_fix}\${eslint || stylelint ? ' && ' : ''}\` : ''}\${eslint ? \`\${script_eslint_fix}\${stylelint ? ' && ' : ''}\` : ''}\${stylelint ? \`\${script_stylelint_fix}\` : ''}",
\``;

export default tpl;