const tpl = 
`\`
      {
        test: /\\.css$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              MiniCssExtractPlugin.loader,
              { loader: 'css-loader', options: { modules: true } }
            ]
          },
          {
            use: [MiniCssExtractPlugin.loader, 'css-loader']
          }
        ]
      },
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
        test: /\.(scss|sass)$/,
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