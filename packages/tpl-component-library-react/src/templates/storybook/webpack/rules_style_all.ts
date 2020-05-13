const tpl = 
`\`
      {
        test: /\\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
\``;

export default tpl;