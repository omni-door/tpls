const tpl = 
`\`withLess({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
    lessLoaderOptions: {
      javascriptEnabled: true
    }
  }),
  withCss,\``;

export default tpl;