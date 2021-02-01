import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`# \${project_name}

## 安装依赖 (Install dependencies)

\\\`\\\`\\\`shell
\${install}
\\\`\\\`\\\`

## 开发项目 (Develop project)

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

## 生产环境运行项目 (Run project in production env)

\\\`\\\`\\\`shell
npm run build && npm start
\\\`\\\`\\\`

**更多配置项请在 [\${configFileName}](https://github.com/omni-door/cli/blob/master/docs/OMNI.zh-CN.md) 中编辑 (More powerful customizations is in [\${configFileName}](https://github.com/omni-door/cli/blob/master/docs/OMNI.md))**
\``;

export const tpl_readme = {
  tpl
};

export default tpl_engine_init(tpl_readme, 'tpl');
