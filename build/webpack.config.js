const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

const nodeModulesDir = path.resolve(__dirname, '../node_modules');

const srcPath = path.resolve(__dirname, '../src');
const tsCfgFile = path.join(srcPath, 'tsconfig.json');

module.exports = {
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': srcPath
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
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          configFile: tsCfgFile
        }
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts', 'js']
    }),
  ]
};
