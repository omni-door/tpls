import { tplEngineInit } from '@omni-door/utils';

const tpl = 
`\`# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
\``;

export const tpl_editor = {
  tpl 
};

export default tplEngineInit(tpl_editor, 'tpl');