const tpl = 
`\`
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
\``;

export default tpl;