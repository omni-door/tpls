const tpl = 
`\`withLess({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    }
  }),
  withSass,
  withCss,\``;

export default tpl;