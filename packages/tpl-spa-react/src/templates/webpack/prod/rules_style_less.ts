const tpl = 
`\`
      {
        test: /\\.(css|less)$/,
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
              { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } }
            ]
          }
        ]
      }
\``;

export default tpl;