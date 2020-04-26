const tpl = 
`\`
      {
        test: /\\.(css|less)$/,
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
      }
\``;

export default tpl;