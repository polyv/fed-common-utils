/**
 * 本地开发环境的 Webpack 配置。
 */

const path = require('path');
const webpack = require('webpack');
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

const devServer = {
  host: '0.0.0.0',
  disableHostCheck: true,
  port: 14003,
  compress: false,
  overlay: true,
  stats: 'minimal',
};

module.exports = merge(config, {
  mode: 'development',
  entry,
  devServer,
  plugins: [
    ...htmlWebpackPlugins,
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../qunit'),
          to: '/qunit'
        }
      ]
    }),
    new webpack.ProgressPlugin((percentage, message, ...args) => {
      const percent = Math.round(percentage * 100);
      if (percent < 100) {
        console.clear();
        console.info(`🔨 编译中... ${percent}% ${message}`, ...args);
      }
    }),
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('DonePlugin', () => {
          console.clear();
          // 获取 host 和 port
          const host = devServer.host || 'localhost';
          const port = devServer.port || 8080;
          const protocol = devServer.https ? 'https' : 'http';

          const url = `${protocol}://${host === '0.0.0.0' ? 'localhost' : host}:${port}`;
          console.log(
            '\x1b[32m%s\x1b[0m',
            '🎉 编译完成！请访问以下地址'
          );
          console.log('-------------------');
          Object.entries(entry).forEach(([pageKey]) => {
            console.log(`${url}/${pageKey}`);
          });
          console.log('-------------------');
        });
      }
    }
  ],

});
