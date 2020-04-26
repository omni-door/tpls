import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

const path = require('path');

module.exports = {
  type: '\${project_type}', // 项目类型，请勿任意变动 (project type, please don't modify)

  build: {
    // 构建完成后是否自动发布 (auto release project after build success)
    autoRelease: false,

    // 输入路径 (the build source directory)
    // 务必使用绝对路径 (must be a absolute path)
    srcDir: path.resolve('src/components'),

    // 输出路径 (the directory for compiled project)
    // 务必使用绝对路径 (must be a absolute path)
    outDir: path.resolve('lib'),

    // es6 module输出路径 (es6 module compiled directory)
    // 务必使用绝对路径 (must be a absolute path)
    esmDir: path.resolve('es'),

    reserve: {
      style: true, // 构建结果是否保留样式文件 (whether or not reserve the stylesheet files)
      assets: [] // 构建结果保留其他资源的路径 (reserve other asset paths)
    },

    preflight: {
      typescript: \${!!ts}, // 构建时是否处理ts或tsx文件 (whether or not process the ts or tsx files)
      test: \${!!test}, // 构建时是否进行单元测试 (whether or not process unit-test)
      eslint: \${!!eslint}, // 构建时是否进行eslint检测 (whether or not process eslint fix and check)
      prettier: \${!!prettier}, // 构建时是否进行prettier检测 (whether or not process prettier checking)
      stylelint: \${!!stylelint}, // 构建时是否进行stylelint检测 (whether or not process style lint check)
    }
  },

  release: {
    git: '', // 发布的git仓库地址 (project git repo url)
    npm: '', // 发布的npm仓库地址 (npm depository url)
    preflight: {
      test: \${!!test}, // 发布前是否进行单元测试 (whether or not process unit-test)
      eslint: \${!!eslint}, // 发布前是否进行eslint检测 (whether or not process eslint fix and check)
      prettier: \${!!prettier}, // 发布前是否进行prettier检测 (whether or not process prettier checking)
      stylelint: \${!!stylelint}, // 发布前是否进行stylelint检测 (whether or not process style lint check)
      commitlint: \${!!commitlint}, // 发布前是否进行commitlint检测 (whether or not process commit lint check)
      branch: 'master' // 发布前进行分支检测，设置为空字符串则不会检测 (only can release in this branch, set empty string to ignore this check)
    }
  },

  template: {
    // 生成模板的根路径 (the root directory for generate template)
    // 务必使用绝对路径 (must be a absolute path)
    root: path.resolve('src/components'),
    typescript: \${!!ts}, // 是否创建ts文件 (whether or not generate typescript)
    test: \${!!test}, // 是否创建单元测试文件 (whether or not generate unit test frame)
    stylesheet: '\${style === 'all' ? 'scss' : style}', // 样式文件类型 (stylesheet type)
    readme: [true, \${mdx ? "'mdx'" : "'md'"}] // [是否生成ReadMe文件, 创建md 或 mdx文件] ([whether or not README.md, generate mdx or md file])
  },

  plugins: []
};
\``;

export const tpl_omni = {
  tpl
};

export default (mdx: boolean) => tpl_engine_init(tpl_omni, 'tpl', { mdx });