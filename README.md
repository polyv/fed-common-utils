# POLYV 工具函数库

本项目提供 Web 前端常用的底层工具函数库，主要用于 POLYV 各类 Web 产品。

## 安装

```
npm install @polyv/utils
```

NPM 包同时提供了源文件（ES 2015 Modules）以及构建后的文件（CommonJS Modules），分别位于 src 和 dist 两个子文件夹。开发者可以根据项目的实际情况使用其中之一（由于 Webpack 的 tree shaking 对 CommonJS Modules 无效，故**推荐使用源文件**）。

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

  // 指定需要 babel 转译
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
    // 指定需要 babel 转译
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
- iOS >= 9
- Android >= 4.4
