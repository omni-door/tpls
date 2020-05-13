const tpl = 
`\`
      {
        test: /\\.less$/,
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
      },
      {
        test: /\.(css|scss|sass)$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              MiniCssExtractPlugin.loader,
              { loader: 'css-loader', options: { modules: true } },
              'sass-loader'
            ]
          },
          {
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
          }
        ]
      }
\``;

export default tpl;