const path = require('path');
const merge = require('webpack-merge').merge;
const glob = require('glob');
const config = require('./webpack.config.js');

const entry = {};

const srcPath = path.join(__dirname, '../src');
glob.sync('*.js', {
  cwd: srcPath
}).forEach((jsPath) => {
  entry[path.basename(jsPath, '.js')] = path.join(srcPath, jsPath);
});

module.exports = merge(config, {
  mode: 'production',
  entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs2'
  }
});
