import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`---
title: Omni Project!
publishDate: \${publishDate}
tags: 
  - test
---

The first content.

---

Hello world!

\\\`\\\`\\\`js
(function () {
  console.log('Hello world!');
})();
\\\`\\\`\\\`
\``;

export const tpl_bisheng_posts = {
  tpl
};

export default () => {
  const date = new Date();
  return tplEngineInit(tpl_bisheng_posts, 'tpl', {
    publishDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  });
};
