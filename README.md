# @omni-door/tpls

English | [简体中文](./README.zh-CN.md)

`@omni-door/tpls` is a monorepo that manage by [lerna](https://lerna.js.org/) which contain the `@omni-door/cli` dependencies templates collection

## templates list
| name | description |
| --- | --- |
| [@omni-door/tpl-spa-react](https://github.com/omni-door/tpls/tree/master/packages/tpl-spa-react#readme) | React Single-Application-App template |
| [@omni-door/tpl-toolkit](https://github.com/omni-door/tpls/tree/master/packages/tpl-toolkit#readme) | toolkit template |
| [@omni-door/tpl-component-library-react](https://github.com/omni-door/tpls/tree/master/packages/tpl-component-library-react#readme) | React Component-Library template |

## 开发说明
- install all templates dependencies
  ```shell
  yarn bootstrap
  ```

- unit-test
  ```shell
  yarn test
  ```

- lint process
  ```shell
  yarn lint
  ```

- build all
  ```shell
  yarn build
  ```

- release all
  ```shell
  yarn release
  ```