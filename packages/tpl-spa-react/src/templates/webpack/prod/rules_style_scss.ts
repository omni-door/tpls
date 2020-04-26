const tpl = 
`\`
      {
        test: /\\.(css|scss|sass)$/,
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