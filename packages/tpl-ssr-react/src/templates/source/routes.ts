import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`// The route base on next-url-prettifier
// https://github.com/BDav24/next-url-prettifier
// Client Usage: https://github.com/BDav24/next-url-prettifier#in-your-components
const UrlPrettifier = require('next-url-prettifier').default;

class NextUrlRouter extends UrlPrettifier {
  constructor (routes, options = {}) {
    super(routes, options);
    this.root = options.root || '';
    this.linkPage = this.linkPage.bind(this);
    this.forEachPattern = this.forEachPattern.bind(this);
  }

  linkPage (pageName, params  = {}) {
    const route = this.routes.find(currentRoute => currentRoute.page === pageName);
    const obj = {
      as: '',
      href: \\\`/\\\${pageName}\\\${this.paramsToQueryString(params)}\\\`
    };
    if (route && route.prettyUrl) {
      obj.as = this.root + (typeof route.prettyUrl === 'string' ? route.prettyUrl : route.prettyUrl(params));
    }
    return obj;
  }

  forEachPattern (apply) {
    this.routes.forEach((route) => {
      this.getPrettyUrlPatterns(route).forEach(prettyPattern =>
        apply({
          page: route.page,
          beforeRender: route.beforeRender,
          pattern: this.root + prettyPattern.pattern,
          defaultParams: prettyPattern.defaultParams
        })
      );
    });
  }
}

const routes = [
  {
    page: 'index',
    prettyUrl: '/home',
    prettyUrlPatterns: [
      { pattern: '/' },
      { pattern: '/home' }
    ]
  },
  {
    page: 'start',
    prettyUrl: ({ step = '' } = {}) =>
    \\\`/start/\\\${step}\\\`,
    prettyUrlPatterns: [
      { pattern: '/start' },
      { pattern: '/start/:step' }
    ]
  },
  {
    page: 'docs',
    prettyUrl: ({ article = '' } = {}) =>
    \\\`/docs/\\\${article}\\\`,
    prettyUrlPatterns: [
      { pattern: '/docs' },
      { pattern: '/docs/:article' }
    ]
  }
];

const nextRouter = new NextUrlRouter(routes);

module.exports = {
  nextRouter,
  routes
};
\``;

export const tpl_src_routes = {
  tpl
};

export default tpl_engine_init(tpl_src_routes, 'tpl');