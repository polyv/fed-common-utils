const path = require('path');
const merge = require('webpack-merge');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const config = require('./webpack.config.js');

const entry = {};
const htmlWebpackPlugins = [];

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
      chunks: ['polyfill', key],
      inject: 'body'
    })
  );
});

module.exports = merge(config, {
  mode: 'development',
  entry: Object.assign({
    polyfill: ['core-js', 'regenerator-runtime/runtime']
  }, entry),
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 14003,
    compress: false,
    overlay: true
  },
  plugins: htmlWebpackPlugins.concat([
    new CopyPlugin([
      {
        from: path.resolve(__dirname, '../qunit'),
        to: '/qunit'
      }
    ])
  ])
});
