# POLYV 工具函数库

本项目提供 Web 前端常用的底层工具函数库，主要用于 POLYV 各类 Web 产品。

## 安装

```
npm install @polyv/utils
```

NPM 包同时提供了 ES 模块以及 CommonJS 模块，分别位于 `dist/es` 和 `dist/cjs` 两个文件夹。它们使用上的区别和优缺点在于：

| 模块类型 | Tree shaking | Babel 编译 |
| --- | --- | --- |
| ES 模块 | 有效，只有用到的代码会被打包 | 需要 |
| CommonJS 模块 | 无效，依赖的文件会被整个打包 | 不需要 |


## 使用

### 在基于 Vue.js 框架的项目中使用

以 Vue CLI 3.x 创建的项目为例，编辑 vue.config.js 增加相关配置：

``` javascript
module.exports = {
  // 省略其他配置

  configureWebpack: {
    resolve: {
      alias: {
        // 配置别名缩短引用路径
        '@utils': path.resolve(__dirname, './node_modules/@polyv/utils/dist/es')
      }
    }
  },

  // ES 模块需要 Babel 转译
  transpileDependencies: [
    '@polyv/utils'
  ]
};
```

在项目代码中引入：

``` javascript
import { cutStr } from '@utils/string';
import Countdown from '@utils/countdown';
```

### 在基于 Nuxt.js 框架的项目中使用

以 create-nuxt-app 创建的项目为例，编辑 nuxt.config.js 增加相关配置：

``` javascript
module.exports = {
  // 省略其他配置

  build: {
    // ES 模块需要 Babel 转译
    transpile: [
      '@polyv/utils'
    ]
  },

  extend(config, ctx) {
    // 配置别名缩短引用路径
    config.resolve.alias['@utils'] = path.resolve(
      __dirname, './node_modules/@polyv/utils/dist/es'
    );
  }
};
```

在项目代码中引入：

``` javascript
import { cutStr } from '@utils/string';
import { Countdown } from '@utils/countdown';
```

## 兼容性
- IE >= 9
- iOS >= 9 (未测试更低版本)
- Android >= 5 (未测试更低版本)

## 其他
- [API 文档（1.6.3）](https://polyv.github.io/fed-common-utils/1.6.3/index.html)
- [API 文档（2.x）](https://polyv.github.io/fed-common-utils/2.x/index.html)

## 2.0.0 版本的变更

2.0.0 与 1.x 相比有较大的变更，如需升级，请参阅下方变更说明：

- 部分功能模块分离为独立的 npm 包：
  - 原 lang 模块已废弃，请使用 [@just4/util](https://www.npmjs.com/package/@just4/util)。
  - 原 browser 模块已废弃，请使用 [@just4/ua-info](https://www.npmjs.com/package/@just4/ua-info)。
  - 原 cookie 模块已废弃，请使用 [@just4/cookie](https://www.npmjs.com/package/@just4/cookie)。
  - 原 polling 模块已废弃，请使用 [@just4/polling](https://www.npmjs.com/package/@just4/polling)。
  - 原 storage 模块已废弃，请使用 [@just4/storage](https://www.npmjs.com/package/@just4/storage)。
- 部分 API 的变更：
  - boolean 模块的 `ynToBool` 支持指定默认值。
  - countdown 模块的 `Countdown` 类增加 `pause` 方法。
  - string 模块的 `cutStr`、`strLen` 两个方法的选项，不再支持 `mode` 属性。
  - string 模块新增 `uuidV4` 方法。
  - validate 模块的 `isPhoneNO` 方法改名为 `isChsPhoneNO`。
- CommonJS 模块的路径是 dist/cjs（原来是 dist），ES 模块的路径是 dist/es（原来是 src）。
