const tpl = 
`\`
      {
        test: /\\.css$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { modules: { localIdentName: '[local]___[hash:base64:6]' } } }
            ]
          },
          {
            use: ['style-loader', 'css-loader']
          }
        ]
      }
\``;

export default tpl;