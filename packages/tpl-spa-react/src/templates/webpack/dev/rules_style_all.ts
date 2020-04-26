const tpl = 
`\`
      {
        test: /\\.css$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { modules: true } }
            ]
          },
          {
            use: ['style-loader', 'css-loader']
          }
        ]
      },
      {
        test: /\\.less$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { modules: true } },
              { loader: 'less-loader', options: { javascriptEnabled: true } }
            ]
          },
          {
            use: ['style-loader', 'css-loader', { loader: 'less-loader', options: { javascriptEnabled: true } }]
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { modules: true } },
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