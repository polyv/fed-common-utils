const path = require('path');


const nodeModulesDir = path.resolve(__dirname, '../node_modules');

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
        exclude: [
          nodeModulesDir
        ],
        loader: 'babel-loader'
      },

      {
        test: /\.m?js$/,
        exclude: [
          nodeModulesDir
        ],
        loader: 'eslint-loader'
      }
    ]
  }
};
