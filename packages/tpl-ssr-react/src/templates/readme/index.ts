import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`# \${project_name}

## 启动项目 (Run project)

\\\`\\\`\\\`shell
npm start
\\\`\\\`\\\`
or
\\\`\\\`\\\`shell
npm run dev
\\\`\\\`\\\`

## 新建组件 (Create a Component)

\\\`\\\`\\\`shell
npm run new
\\\`\\\`\\\`

### 新建一个名为Button的函数组件 (Create a functional Component which name is Button)
\\\`\\\`\\\`shell
npm run new Button -- -f
\\\`\\\`\\\`

## 构建项目 (Build project)

\\\`\\\`\\\`shell
npm run build
\\\`\\\`\\\`

### 构建项目时绕过所有检查 (Bypass all pre-check before building)
\\\`\\\`\\\`shell
npm run build -- -n
\\\`\\\`\\\`

## 发布项目 (Release project)

\\\`\\\`\\\`shell
npm run release
\\\`\\\`\\\`

### 发布项目时忽略版本迭代 (Ignoring version of iteration)
\\\`\\\`\\\`shell
npm run release -- -i
\\\`\\\`\\\`

### 发布项目时指定迭代的版本为0.3.25 (Manual specify version of iteration to 0.3.25)
\\\`\\\`\\\`shell
npm run release -- -m 0.3.25
\\\`\\\`\\\`

\#\#\# 发布项目时绕过所有检查 (Bypass all pre-check before release)
\\\`\\\`\\\`shell
npm run release -- -n
\\\`\\\`\\\`

**更多配置项请在 [\${configFileName}](https://github.com/omni-door/cli/blob/master/docs/OMNI.zh-CN.md) 中编辑 (More powerful customizations is in [\${configFileName}](https://github.com/omni-door/cli/blob/master/docs/OMNI.md))**
\``;

export const tpl_readme = {
  tpl
};

export default tpl_engine_init(tpl_readme, 'tpl');
