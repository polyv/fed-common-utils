const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                modules: false
              }]
            ],
            plugins: [
              // Stage 3
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-syntax-import-meta',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-json-strings'
            ]
          }
        }
      },

      {
        test: /\.m?js$/,
        exclude: [
          path.resolve(__dirname, '../node_modules')
        ],
        loader: 'eslint-loader'
      }
    ]
  }
};
