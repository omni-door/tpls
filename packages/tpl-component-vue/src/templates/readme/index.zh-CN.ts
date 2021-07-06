import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`# \${project_name}

[English](./README.md) | 简体中文

## 快速开始
### 安装
\\\`\\\`\\\`shell
\${runScript} add \${project_name}
\\\`\\\`\\\`

### 使用

## 开发
对于调试或维护，可以将项目 clone 到本地，然后启动项目。

\\\`\\\`\\\`shell
git clone --depth 1

\${install} && \${runScript} dev
\\\`\\\`\\\`

[更多详情](./DEV.zh-CN.md)
\``;

export const tpl_readme_cn = {
  tpl
};

export default tplEngineInit(tpl_readme_cn, 'tpl');