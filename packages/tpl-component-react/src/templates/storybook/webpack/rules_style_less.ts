const tpl = 
`\`
      {
        test: /\\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
\``;

export default tpl;