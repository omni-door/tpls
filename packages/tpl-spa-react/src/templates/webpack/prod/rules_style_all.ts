const tpl = 
`\`
      {
        test: /\\.less$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              MiniCssExtractPlugin.loader,
              { loader: 'css-loader', options: { modules: { localIdentName: '[local]___[hash:base64:6]' } } },\${layout !== 'px' ? \`
              { loader: 'postcss-loader', options: { postcssOptions: { config: path.resolve(__dirname, 'postcss.config.js') } } },\` : ''}
              { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } }
            ]
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',\${layout !== 'px' ? \`
              { loader: 'postcss-loader', options: { postcssOptions: { config: path.resolve(__dirname, 'postcss.config.js') } } },\` : ''}
              { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } }]
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
              { loader: 'css-loader', options: { modules: { localIdentName: '[local]___[hash:base64:6]' } } },\${layout !== 'px' ? \`
              { loader: 'postcss-loader', options: { postcssOptions: { config: path.resolve(__dirname, 'postcss.config.js') } } },\` : ''}
              'sass-loader'
            ]
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',\${layout !== 'px' ? \`
              { loader: 'postcss-loader', options: { postcssOptions: { config: path.resolve(__dirname, 'postcss.config.js') } } },\` : ''}
              'sass-loader'
            ]
          }
        ]
      }
\``;

export default tpl;