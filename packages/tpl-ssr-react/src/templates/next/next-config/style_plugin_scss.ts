const tpl = 
`\`withSass({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    }
  }),
  withCss,\``;

export default tpl;