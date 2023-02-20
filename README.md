<p align="center">
  <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">
    <img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo">
  </a>
</p>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-3.0-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/element-plus/element-plus">
    <img src="https://img.shields.io/badge/element--plus-1.x-blue" alt="element-plus">
  </a>
  <a href="https://github.com/vuejs/vuex">
    <img src="https://img.shields.io/badge/vuex-4.0-brightgreen" alt="vuex">
  </a>
   <a href="https://github.com/intlify/vue-i18n-next">
    <img src="https://img.shields.io/badge/vue--i18n--next-9.0-brightgreen" alt="vue-i18n-next">
   </a>
   <a href="https://github.com/npm/npm">
    <img src="https://img.shields.io/badge/npm-6.1.8-blue" alt="npm">
   </a>
</p>

> vue3-typescript-admin 是一个管理端模板解决方案，它是基于 vue3,ts 和 element-plus，项目都是以 composition api 风格编写。

## 简介

项目的基础版本出自于源于花裤衩大佬的 vue-element-admin。

vue3 发布之后，性能增强，速度 vue2 的倍数，打包体积都在减小（treeshaking），composition api 增加了项目可读性。

### 目录结构

```
vue3-typescript-admin
├─ README.md
├─ dist               # 打包dist
├─ public             # 静态资源
├─ src                # 源码
│  ├─ @types          # ts 声明
│  ├─ apis            # 接口请求
│  ├─ assets          # webpack打包的资源
│  ├─ components      # 公共组件
│  ├─ config          # 全部配置
│  ├─ constant        # 常量
│  ├─ directives      # 全局指令
│  ├─ layout          # 全局Layout
│  ├─ locales         # 国际化
│  ├─ model           # 全部model存放
│  ├─ plugins         # 插件
│  ├─ router          # 路由
│  ├─ store           # 全局store管理
│  ├─ styles          # 全局样式
│  ├─ utils           # 全局公共方法
│  └─ views           # 所有业务页面
├─ .env.dev.build     # 开发环境
├─ .env.dev.serve     # 开发本地本地
├─ .env.prod.build    # 生产环境
├─ .env.prod.serve    # 生产环境本地
├─ .env.test.build    # 测试环境
├─ .env.test.serve    # 测试环境本地
├─ .eslintrc.js       # eslint
├─ tsconfig.json      # ts 编译配置
└─ vue.config.js      # vue-cli 配置

```

## HighLight

项目均已最新技术实现，Vue3 配套升级全家桶和涉及的插件组件等

项目采用技术:

- vue3 + composition api
- typescript
- sass (dart sass)
- [echats5](https://github.com/apache/echarts)

vue next 系列:

- [element-plus](https://github.com/element-plus/element-plus)
- [vue-router-next](https://github.com/vuejs/vue-router-next)
- [vuex-4.0](https://github.com/vuejs/vuex)
- [vue-vue-i18n-next](https://github.com/panter/vue-i18next)

## Setup

```shell
  npm install
```

```shell
  yarn serve:dev
```

```shell
  npm run serve:dev
```

多环境命令查看 package.json script:

```shell
    "serve:dev": "cross-env NODE_ENV=development dotenv -e .env.dev.serve vue-cli-service serve",
    "build:dev": "cross-env NODE_ENV=production  dotenv -e .env.dev.build vue-cli-service build",
    "serve:test": "cross-env NODE_ENV=development dotenv -e .env.test.serve vue-cli-service serve",
    "build:test": "cross-env NODE_ENV=production  dotenv -e .env.test.build vue-cli-service build",
    "serve:prod": "cross-env NODE_ENV=development dotenv -e .env.prod.serve vue-cli-service serve",
    "build:prod": "cross-env NODE_ENV=production  dotenv -e .env.prod.build vue-cli-service build",
```

### eslint

```shell
    yarn  lint
```

or

```shell
    npm run lint
```

提交自动检测：

```shell
"gitHooks": {
  "pre-commit": "lint-staged"
},
"lint-staged": {
  "*.{js,jsx,vue,ts,tsx}": [
  "vue-cli-service lint",
  "prettier --config .prettierrc.json --write",
  "eslint --cache --fix",
  "git add"
  ]
}
```

## Browsers support

Modern browsers and Internet Explorer 10+.

| IE / Edge | Firefox | Chrome | Safari |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, IE11, Edge | last 3 versions | last 3 versions | last 3 versions

![tera-li badge](https://visitor-badge.glitch.me/badge?page_id=tera-li.visitor-badge&left_color=red&right_color=green)
