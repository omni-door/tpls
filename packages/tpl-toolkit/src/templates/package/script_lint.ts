const tpl = 
`\`
    "lint": "\${prettier ? \`\${script_prettier}\${eslint ? ' && ' : ''}\` : ''}\${eslint ? \`\${script_eslint}\` : ''}",
    "lint:fix": "\${prettier ? \`\${script_prettier_fix}\${eslint ? ' && ' : ''}\` : ''}\${eslint ? \`\${script_eslint_fix}\` : ''}",
\``;

export default tpl;