const tpl = 
`\`
      {
        test: /\\.css$/,
        oneOf: [
          {
            resourceQuery: /modules/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { modules: { localIdentName: '[local]___[hash:base64:6]' } } },
              { loader: 'postcss-loader', options: { postcssOptions: { config: path.resolve(__dirname, 'postcss.config.js') } } }
            ]
          },
          {
            use: [
              'style-loader',
              'css-loader',
              { loader: 'postcss-loader', options: { postcssOptions: { config: path.resolve(__dirname, 'postcss.config.js') } } }
            ]
          }
        ]
      }
\``;

export default tpl;