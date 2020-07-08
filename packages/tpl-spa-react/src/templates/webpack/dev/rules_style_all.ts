const tpl = 
`\`
      {
        test: /\\.less$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { modules: { localIdentName: '[local]___[hash:base64:6]' } } },
              { loader: 'less-loader', options: { javascriptEnabled: true } }
            ]
          },
          {
            use: ['style-loader', 'css-loader', { loader: 'less-loader', options: { javascriptEnabled: true } }]
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { modules: { localIdentName: '[local]___[hash:base64:6]' } } },
              'sass-loader'
            ]
          },
          {
            use: ['style-loader', 'css-loader', 'sass-loader']
          }
        ]
      }
\``;

export default tpl;