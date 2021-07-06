import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`# 开发

### 安装依赖
\\\`\\\`\\\`shell
\${install}
\\\`\\\`\\\`

### 启动项目
\\\`\\\`\\\`shell
\${runScript} dev
\\\`\\\`\\\`

### 新建模块
\\\`\\\`\\\`shell
\${runScript} new
\\\`\\\`\\\`

### 构建
\\\`\\\`\\\`shell
\${runScript} build
\\\`\\\`\\\`

*构建项目时绕过所有检查👇*
\\\`\\\`\\\`shell
\${runScript} build \${paramScript}n
\\\`\\\`\\\`

### 发布
\\\`\\\`\\\`shell
\${runScript} release
\\\`\\\`\\\`

*发布项目时忽略版本迭代👇*
\\\`\\\`\\\`shell
\${runScript} release \${paramScript}i
\\\`\\\`\\\`

*发布项目时指定迭代的版本为 0.3.25 👇*
\\\`\\\`\\\`shell
\${runScript} release \${paramScript}m 0.3.25
\\\`\\\`\\\`

*发布项目时绕过所有检查👇*
\\\`\\\`\\\`shell
\${runScript} release \${paramScript}n
\\\`\\\`\\\`

**更多配置项请在 [\${configFileName}](https://github.com/omni-door/cli/blob/master/docs/OMNI.zh-CN.md) 中编辑**
\``;

export const tpl_readme_dev_cn = {
  tpl
};

export default tplEngineInit(tpl_readme_dev_cn, 'tpl');