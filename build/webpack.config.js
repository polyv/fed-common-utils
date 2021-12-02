/**
 * 通用 Webpack 配置（目前只用于本地开发环境）。
 */

const path = require('path');
const srcPath = path.resolve(__dirname, '../src');
const tsCfgFile = path.join(srcPath, 'tsconfig.es5.json');
const nodeModulesDir = path.resolve(__dirname, '../node_modules');
const ESLintPlugin = require('eslint-webpack-plugin');

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
