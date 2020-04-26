import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>\${project_name}</title>
  </head>
  <body>
    <div id='root'></div>
  </body>
</html>
\``;

export const tpl_src_html = {
  tpl
};

export default tpl_engine_init(tpl_src_html, 'tpl');