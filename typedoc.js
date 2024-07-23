/**
 * TypeDoc 的 entryPoints 要列出所有入口文件。
 * 为了避免手动维护入口文件的列表，通过 glob 去匹配。
 */

const path = require('path');
const glob = require('glob');

module.exports = {
  entryPoints: glob.sync('**/*.ts', {
    cwd: path.resolve(__dirname, './src'),
    absolute: true
  }),
  out: path.resolve(__dirname, './docs/2.x'),
  excludeInternal: true,
  validation: {
    invalidLink: true
  }
};
