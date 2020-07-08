const tpl = 
`\`
      {
        test: /\\.css$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              MiniCssExtractPlugin.loader,
              { loader: 'css-loader', options: { modules: { localIdentName: '[local]___[hash:base64:6]' } } }
            ]
          },
          {
            use: [MiniCssExtractPlugin.loader, 'css-loader']
          }
        ]
      }
\``;

export default tpl;