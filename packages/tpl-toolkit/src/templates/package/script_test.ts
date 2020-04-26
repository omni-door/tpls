const tpl = 
`\`
		"test": "karma start --single-run && npm run test:mocha",
		"test:mocha": "nyc mocha --opts mocha.opts",
		"test:headless": "karma start --single-run --browsers ChromeHeadless karma.conf.js",
		"test:browser": "karma start --browsers Chrome",
\``;

export default tpl;