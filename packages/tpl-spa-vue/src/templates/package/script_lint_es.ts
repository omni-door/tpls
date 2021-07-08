const tpl = 
`\`
    "lint:es": "eslint src/ --ext .vue --ext .\${ts ? 'ts' : 'js'} --ext .\${ts ? 'tsx' : 'jsx'} --ext .vue",
    "lint:es_fix": "eslint src/ --ext .vue --ext .\${ts ? 'ts' : 'js'} --ext .\${ts ? 'tsx' : 'jsx'} --ext .vue --fix",
\``;

export default tpl;