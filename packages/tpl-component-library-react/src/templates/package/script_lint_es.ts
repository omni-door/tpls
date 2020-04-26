const tpl = 
`\`
    "lint:es": "eslint src/ --ext .\${ts ? 'ts' : 'js'} --ext .\${ts ? 'tsx' : 'jsx'}",
    "lint:es_fix": "eslint src/ --ext .\${ts ? 'ts' : 'js'} --ext .\${ts ? 'tsx' : 'jsx'} --fix",
\``;

export default tpl;