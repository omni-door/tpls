import { tpl_engine_init, BUILD } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

const path = require('path');

module.exports = {
  type: '\${project_type}', // 项目类型，请勿任意变动 (project type, please don't modify)

  dev: {
    port: 6200, // 开发服务端口号 (dev-server port)
    serverType: 'dumi' // 开发服务类型 (dev-server type)
  },

  build: {
    // 构建完成后是否自动发布 (auto release project after build success)
    autoRelease: false,

    // 输入路径 (the build source directory)
    // 务必使用绝对路径 (must be a absolute path)
    srcDir: path.resolve('src/toolkit'),
    
    // 输出路径 (the directory for compiled project)
    // 务必使用绝对路径 (must be a absolute path)
    outDir: path.resolve('lib'),

    // es6 module输出路径 (es6 module compiled directory)
    // 务必使用绝对路径 (must be a absolute path)
    esmDir: path.resolve('es'),

    // 打包工具，支持 tsc、rollup (build tool, support tsc and rollup)
    tool: '\${build}', 

    // 构建阶段的自定义配置回调 (The callback will be call in the build-process)
    // 返回自定义的配置 (You can return your custom build configuration)
    configuration: config => config,

    reserve: {
      assets: [] // 构建结果保留资源的路径 (reserve assets paths)
    },

    preflight: {
      typescript: \${!!ts}, // 构建时是否处理ts或tsx文件 (whether or not process the ts or tsx files)
      test: \${!!test}, // 构建时是否进行单元测试 (whether or not process unit-test)
      eslint: \${!!eslint}, // 构建时是否进行eslint检测 (whether or not process eslint checking)
      prettier: \${!!prettier} // 构建时是否进行prettier检测 (whether or not process prettier checking)
    }
  },

  release: {
    git: '\${git}', // 发布的git仓库地址 (project git repo url)
    npm: '', // 发布的npm仓库地址 (npm depository url)
    preflight: {
      test: \${!!test}, // 发布前是否进行单元测试 (whether or not process unit-test)
      eslint: \${!!eslint}, // 发布前是否进行eslint检测 (whether or not process eslint checking)
      prettier: \${!!prettier}, // 发布前是否进行prettier检测 (whether or not process prettier checking)
      commitlint: \${!!commitlint}, // 发布前是否进行commitlint检测 (whether or not process commitlint checking)
      branch: 'master' // 发布前进行分支检测，设置为空字符串则不会检测 (only can release in this branch, set empty string to ignore this check)
    }
  },

  template: {
    // 生成模板的根路径 (the root directory for generate template)
    // 务必使用绝对路径 (must be a absolute path)
    root: path.resolve('src/toolkit'),
    typescript: \${!!ts}, // 是否创建ts文件 (whether or not generate typescript)
    test: \${!!test}, // 是否创建单元测试文件 (whether or not generate unit test frame)
    readme: [true, 'md'] // [是否生成ReadMe文件, 创建md 或 mdx文件] ([whether or not README.md, generate mdx or md file])
  },

  plugins: []
};
\``;

export const tpl_omni = {
  tpl
};

export default (build: BUILD) => tpl_engine_init(tpl_omni, 'tpl', { build });