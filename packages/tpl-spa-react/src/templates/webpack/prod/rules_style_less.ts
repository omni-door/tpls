const tpl = 
`\`
      {
        test: /\\.(css|less)$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              MiniCssExtractPlugin.loader,
              { loader: 'css-loader', options: { modules: { localIdentName: '[local]___[hash:base64:6]' } } },
              { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } }
            ]
          },
          {
            use: [MiniCssExtractPlugin.loader, 'css-loader', { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } }]
          }
        ]
      }
\``;

export default tpl;