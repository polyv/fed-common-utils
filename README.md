# POLYV 工具函数库

本项目提供 Web 前端常用的底层工具函数库，主要用于 POLYV 各类 Web 产品。

## 安装

```
npm install @polyv/utils
```

NPM 包同时提供了源文件（ES 2015 Modules）以及构建后的文件（CommonJS Modules），分别位于 src 和 dist 两个子文件夹。它们使用上的优缺点和区别在于：

| 文件类型 | Tree shaking | 自行编写构建逻辑 |
| --- | --- |
| 源文件 |  有效，只有用到的代码会被打包 | 需要 |
| 构建后文件 | 无效，依赖的文件会被整个打包 | 不需要 |


## 在基于 Vue.js 框架的项目中使用

以 Vue CLI 3.x 创建的项目为例，编辑 vue.config.js 增加相关配置：

``` javascript
module.exports = {
  // 省略其他配置

  configureWebpack: {
    resolve: {
      alias: {
        // 配置别名缩短引用路径
        '@utils': path.resolve(__dirname, './node_modules/@polyv/utils/src')
      }
    }
  },

  // 需要 Babel 转译
  transpileDependencies: [
    '@polyv/utils'
  ]
};
```

## 在基于 Nuxt.js 框架的项目中使用

以 create-nuxt-app 创建的项目为例，编辑 nuxt.config.js 增加相关配置：

``` javascript
module.exports = {
  // 省略其他配置

  build: {
    // 需要 Babel 转译
    transpile: [
      '@polyv/utils'
    ]
  },

  extend(config, ctx) {
    // 浏览器端需要 polyfill
    if (ctx.isClient) {
      config.entry = config.entry || {};
      config.entry.polyfill = ['core-js'];
    }

    // 配置别名缩短引用路径
    config.resolve.alias['@utils'] = path.resolve(
      __dirname, './node_modules/@polyv/utils/src'
    );
  }
};
```

## 兼容性
- IE >= 9
- iOS >= 9 (未测试更低版本)
- Android >= 5 (未测试更低版本)

## 其他
- [API 文档](https://polyv.github.io/utils/index.html)
