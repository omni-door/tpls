const tpl = 
`\`
      {
        test: /\\.(css|less)$/,
        use: ['style-loader', 'css-loader', { loader: 'less-loader', options: { javascriptEnabled: true } }]
      }
\``;

export default tpl;