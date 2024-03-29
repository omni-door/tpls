# @omni-door/tpls

[![Build Status](https://travis-ci.com/omni-door/tpls.svg?branch=master)](https://travis-ci.com/omni-door/tpls)
[![codecov](https://codecov.io/gh/omni-door/tpls/branch/master/graph/badge.svg)](https://codecov.io/gh/omni-door/tpls)
[![license](http://img.shields.io/npm/l/%40omni-door%2Fcli.svg)](https://github.com/omni-door/tpls/blob/master/LICENSE)

[English](./README.md) | 简体中文

`@omni-door/tpls` 是用 lerna 管理的多包项目，其包含了 `@omni-door/cli` 所依赖的模板项目集合，请使用 [lerna](https://lerna.js.org/) 进行项目管理和开发

## 模板列表
| 模板名 | 说明 |
| --- | --- |
| [@omni-door/tpl-component-react](https://github.com/omni-door/tpls/tree/master/packages/tpl-component-react#readme) | React组件库模板 |
| [@omni-door/tpl-component-vue](https://github.com/omni-door/tpls/tree/master/packages/tpl-component-vue#readme) | Vue组件库模板 |
| [@omni-door/tpl-spa-react](https://github.com/omni-door/tpls/tree/master/packages/tpl-spa-react#readme) | React单页应用模板 |
| [@omni-door/tpl-spa-react-pc](https://github.com/omni-door/tpls/tree/master/packages/tpl-spa-react-pc#readme) | 基于[Antd](https://ant.design/)的React单页pc应用模板 |
| [@omni-door/tpl-spa-vue](https://github.com/omni-door/tpls/tree/master/packages/tpl-spa-vue#readme) | Vue单页应用模板 |
| [@omni-door/tpl-ssr-react](https://github.com/omni-door/tpls/tree/master/packages/tpl-ssr-react#readme) | React SSR 模板 |
| [@omni-door/tpl-toolkit](https://github.com/omni-door/tpls/tree/master/packages/tpl-toolkit#readme) | 工具集模板 |

## 开发说明
- 初始化一个脚手架模板
  ```shell
  yarn initial
  ```

- 新建一个脚手架的模板文件
  ```shell
  yarn new
  ```

- 安装依赖
  ```shell
  yarn bootstrap
  ```

- 测试全部子包
  ```shell
  yarn test
  ```

- lint全部子包
  ```shell
  yarn lint
  ```

- 构建全部子包
  ```shell
  yarn build
  ```

- 发布
  ```shell
  yarn release
  ```