const tpl = 
`\`
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\\.less$/,
        use: ['style-loader', 'css-loader', { loader: 'less-loader', options: { javascriptEnabled: true } }]
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
\``;

export default tpl;