import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`\${use_strict}

const path = require('path');
const gulpfile = require('./gulpfile');

module.exports = {
  type: '\${project_type}', // Project type; do not modify.

  dev: {
    port: 6200, // Dev server port.
    // host: 'dev.domain.com', // Dev server host.
    serverType: 'storybook' // Dev server type.
  },

  build: {
    // Auto-release after a successful build.
    autoRelease: false,

    // Build source directory.
    // Must be an absolute path.
    srcDir: path.resolve('src'),

    // Build output directory.
    // Must be an absolute path.
    outDir: path.resolve('lib'),

    // ES module output directory.
    // Must be an absolute path.
    esmDir: path.resolve('es'),

    // Build configuration callback.
    // Return a custom build configuration.
    configuration: gulpfile,

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

    // Auto-set npm tag based on the current version.
    autoTag: false,

    // Git repository URL for release.
    git: '\${git}',

    // npm registry URL for release.
    npm: '\${npm}',

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
    root: path.resolve('src'),

    // Whether to generate TypeScript files.
    typescript: \${!!ts},

    // Whether to generate unit test files.
    test: \${!!test},

    // Stylesheet type.
    stylesheet: '\${style === 'all' ? 'scss' : style}',

    // Generate README.md.
    readme: true
  },

  plugins: []
};
\``;

export const tpl_omni = {
  tpl
};

export default tplEngineInit(tpl_omni, 'tpl');
