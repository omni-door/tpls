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
      }
\``;

export default tpl;