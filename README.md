# @omni-door/tpls
`@omni-door/tpls` 是用 lerna 管理的多包项目，其包含了 `@omni-door/cli` 所依赖的模板项目集合，请使用 [lerna](https://lerna.js.org/) 进行项目管理和开发

## 模板列表
| 模板名 | 说明 |
| --- | --- |
| @omni-door/tpl-spa-react | React单页应用模板 |
| @omni-door/tpl-toolkit | 工具集模板 |
| @omni-door/tpl-component-library-react | React组件库模板 |

## 开发说明
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

- 发布全部子包(版本自动迭代)
  ```shell
  yarn release
  ```