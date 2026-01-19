import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

const path = require('path');

const serverOptions = {
  port: 6600, // Server port.
  serverType: '\${serverType}',
  proxy:  [
    // {
    //   route: '/api',
    //   config: {
    //     target: 'http://www.api.com/api',
    //     changeOrigin: true
    //   }
    // }
  ],
  // host: 'dev.domain.com', // Server host.
  // https: true // Start server with HTTPS.
};

module.exports = {
  type: '\${project_type}', // Project type; do not modify.

  dev: {
    ...serverOptions,
    port: 6200 // Custom dev server port.
  },

  server: {
    ...serverOptions
  },

  build: {
    // Auto-release after a successful build.
    autoRelease: false,

    // Build source directory.
    // Must be an absolute path.
    srcDir: path.resolve(__dirname, '../src'),

    // Build output directory.
    // Must be an absolute path.
    outDir: path.resolve(__dirname, '../dist'),

    reserve: {
      assets: [] // Preserve additional asset paths in the build output.
    },

    preflight: {
      typescript: \${!!ts}, // Whether to process TS/TSX files during build.
      test: \${!!test}, // Whether to run unit tests during build.
      eslint: \${!!eslint}, // Whether to run ESLint during build.
      prettier: \${!!prettier}, // Whether to run Prettier during build.
      stylelint: \${!!stylelint}, // Whether to run Stylelint during build.
    }
  },

  release: {
    // Auto-build before release.
    autoBuild: false,

    // Git repository URL for release.
    git: '\${git}',

    preflight: {
      test: \${!!test}, // Whether to run unit tests before release.
      eslint: \${!!eslint}, // Whether to run ESLint before release.
      prettier: \${!!prettier}, // Whether to run Prettier before release.
      stylelint: \${!!stylelint}, // Whether to run Stylelint before release.
      commitlint: \${!!commitlint}, // Whether to run Commitlint before release.
      branch: 'master' // Only allow release on this branch; set empty string to skip.
    }
  },

  template: {
    // Template root directory.
    // Must be an absolute path.
    root: path.resolve(__dirname, '../src/components'),

    // Whether to generate TypeScript files.
    typescript: \${!!ts},

    // Whether to generate unit test files.
    test: \${!!test},

    // Stylesheet type.
    stylesheet: '\${style === 'all' ? 'scss' : style}'
  },

  plugins: []
};
\``;

export const tpl_omni = {
  tpl
};

export default tplEngineInit(tpl_omni, 'tpl');
