import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`# \${project_name}

## 快速开始 (quick start)
### 安装依赖 (Install dependencies)

\\\`\\\`\\\`shell
\${install}
\\\`\\\`\\\`

### 启动项目 (Run project)

\\\`\\\`\\\`shell
\${runScript} start
\\\`\\\`\\\`
or
\\\`\\\`\\\`shell
\${runScript} dev
\\\`\\\`\\\`

### 新建模块 (Create a Module)

\\\`\\\`\\\`shell
\${runScript} new
\\\`\\\`\\\`

---

## 构建和发布 (Build and Release)
### 构建 (Build)
\\\`\\\`\\\`shell
\${runScript} build
\\\`\\\`\\\`

*构建项目时绕过所有检查 (Bypass all pre-check before building) 👇*
\\\`\\\`\\\`shell
\${runScript} build -- -n
\\\`\\\`\\\`

### 发布 (Release)
\\\`\\\`\\\`shell
\${runScript} release
\\\`\\\`\\\`

*发布项目时忽略版本迭代 (Ignoring version of iteration) 👇*
\\\`\\\`\\\`shell
\${runScript} release -- -i
\\\`\\\`\\\`

*发布项目时指定迭代的版本为0.3.25 (Manual specify version of iteration to 0.3.25) 👇*
\\\`\\\`\\\`shell
\${runScript} release -- -m 0.3.25
\\\`\\\`\\\`

*发布项目时绕过所有检查 (Bypass all pre-check before release) 👇*
\\\`\\\`\\\`shell
\${runScript} release -- -n
\\\`\\\`\\\`

**更多配置项请在 [\${configFileName}](https://github.com/omni-door/cli/blob/master/docs/OMNI.zh-CN.md) 中编辑 (More powerful customizations is in [\${configFileName}](https://github.com/omni-door/cli/blob/master/docs/OMNI.md))**
\``;

export const tpl_readme = {
  tpl
};

export default tpl_engine_init(tpl_readme, 'tpl');