/**
 * 本地开发环境的 Webpack 配置。
 */

const path = require('path');
const merge = require('webpack-merge').merge;
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const config = require('./webpack.config.js');

const entry = {};
const htmlWebpackPlugins = [];

// 每个测试页面对应一个 js，每个 js 都是 entry
const pagePath = path.resolve(__dirname, '../demo');
glob.sync('**/*.html', {
  cwd: pagePath
}).forEach((htmlPath) => {
  const key = htmlPath;
  htmlPath = path.join(pagePath, htmlPath);
  const jsPath = htmlPath.replace(/\.html$/, '.js');
  entry[key] = jsPath;

  htmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      filename: key,
      template: htmlPath,
      chunks: [key],
      inject: 'body'
    })
  );
});

module.exports = merge(config, {
  mode: 'development',
  entry,
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 14003,
    compress: false,
    overlay: true
  },
  plugins: htmlWebpackPlugins.concat([
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../qunit'),
          to: '/qunit'
        }
      ]
    })
  ])
});
