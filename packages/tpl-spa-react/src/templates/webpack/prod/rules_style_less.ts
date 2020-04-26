const tpl = 
`\`
      {
        test: /\\.(css|less)$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              MiniCssExtractPlugin.loader,
              { loader: 'css-loader', options: { modules: true } },
              { loader: 'less-loader', options: { javascriptEnabled: true } }
            ]
          },
          {
            use: [MiniCssExtractPlugin.loader, 'css-loader', { loader: 'less-loader', options: { javascriptEnabled: true } }]
          }
        ]
      }
\``;

export default tpl;