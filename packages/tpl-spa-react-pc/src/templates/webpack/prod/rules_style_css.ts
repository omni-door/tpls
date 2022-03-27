const tpl = 
`\`
      {
        test: /\\.css$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              { loader: MiniCssExtractPlugin.loader, options: { publicPath } },
              { loader: 'css-loader', options: { modules: { localIdentName: '[local]___[hash:base64:6]' } } }
            ]
          },
          {
            use: [
              { loader: MiniCssExtractPlugin.loader, options: { publicPath } },
              'css-loader'
            ]
          }
        ]
      }
\``;

export default tpl;