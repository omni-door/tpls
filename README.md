# @omni-door/tpls

[![Build Status](https://travis-ci.com/omni-door/tpls.svg?branch=master)](https://travis-ci.com/omni-door/tpls)
[![codecov](https://codecov.io/gh/omni-door/tpls/branch/master/graph/badge.svg)](https://codecov.io/gh/omni-door/tpls)
[![license](http://img.shields.io/npm/l/%40omni-door%2Fcli.svg)](https://github.com/omni-door/tpls/blob/master/LICENSE)

English | [简体中文](./README.zh-CN.md)

`@omni-door/tpls` is a monorepo that manage by [lerna](https://lerna.js.org/) which contain the `@omni-door/cli` dependencies templates collection

## templates list
| name | description |
| --- | --- |
| [@omni-door/tpl-spa-react](https://github.com/omni-door/tpls/tree/master/packages/tpl-spa-react#readme) | React Single-Application-App template |
| [@omni-door/tpl-toolkit](https://github.com/omni-door/tpls/tree/master/packages/tpl-toolkit#readme) | Toolkit template |
| [@omni-door/tpl-component-react](https://github.com/omni-door/tpls/tree/master/packages/tpl-component-react#readme) | React Component template |

## develop
- initial a cli-template
  ```shell
  yarn initial
  ```

- create a cli-template's file
  ```shell
  yarn new
  ```

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

- release
  ```shell
  yarn release
  ```