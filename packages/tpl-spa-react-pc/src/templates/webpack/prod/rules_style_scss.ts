const tpl = 
`\`
      {
        test: /\\.(css|scss|sass)$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              { loader: MiniCssExtractPlugin.loader, options: { publicPath } },
              { loader: 'css-loader', options: { modules: { localIdentName: '[local]___[hash:base64:6]' } } },
              'sass-loader'
            ]
          },
          {
            use: [
              { loader: MiniCssExtractPlugin.loader, options: { publicPath } },
              'css-loader',
              'sass-loader'
            ]
          }
        ]
      }
\``;

export default tpl;