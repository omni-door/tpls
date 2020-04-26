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
      }
\``;

export default tpl;