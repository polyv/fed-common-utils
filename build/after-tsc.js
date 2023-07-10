/**
 * tsc 编译后执行的构建逻辑。
 */

const { minify } = require('terser');
const glob = require('glob');
const path = require('path');
const fs = require('fs');


// 构建的目标目录
const distPath = path.resolve(__dirname, '../dist');


// 通过 terser 压缩 tsc 编译出来的代码
async function compress(sourceCode) {
  return (await minify(sourceCode, {
    output: { 'ascii_only': true }
  })).code;
}

glob.sync('**/*.js', {
  cwd: distPath,
  absolute: true
}).forEach(async (jsPath) => {
  fs.writeFileSync(
    jsPath,
    await compress(fs.readFileSync(jsPath, 'utf-8')),
    'utf-8'
  );
});


// 构建 package.json
const pkgJSON = require('../package.json');
// 删除正式包不需要的字段
delete pkgJSON.devDependencies;
delete pkgJSON.scripts;
delete pkgJSON.private;
fs.writeFileSync(
  path.join(distPath, 'package.json'),
  JSON.stringify(pkgJSON, null, 2),
  'utf-8'
);

// 复制 README.md
fs.copyFileSync(
  path.resolve(__dirname, '../README.md'),
  path.join(distPath, 'README.md')
);
