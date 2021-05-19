import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`# \${project_name}

[English](./README.md) | 简体中文

## 快速开始
### 安装依赖
\\\`\\\`\\\`shell
\${install}
\\\`\\\`\\\`

### 开发项目
\\\`\\\`\\\`shell
\${runScript} dev
\\\`\\\`\\\`

### 新建组件

\\\`\\\`\\\`shell
\${runScript} new
\\\`\\\`\\\`

*新建一个名为 Button 的函数组件👇*
\\\`\\\`\\\`shell
\${runScript} new Button \${paramScript}f
\\\`\\\`\\\`

---

## 构建和运行
### 构建
\\\`\\\`\\\`shell
\${runScript} build
\\\`\\\`\\\`

*构建项目时绕过所有检查👇*
\\\`\\\`\\\`shell
\${runScript} build \${paramScript}n
\\\`\\\`\\\`

### 生产环境运行项目
\\\`\\\`\\\`shell
\${runScript} start
\\\`\\\`\\\`

**更多配置项请在 [\${configFileName}](https://github.com/omni-door/cli/blob/master/docs/OMNI.zh-CN.md) 中编辑**
\``;

export const tpl_readme_cn = {
  tpl
};

export default tplEngineInit(tpl_readme_cn, 'tpl');
