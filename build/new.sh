#! /bin/bash

packageName=$(echo ${1} | tr "[A-Z]" "[a-z]")
templateName=$(echo ${2} | tr "[A-Z]" "[a-z]")
type=$(echo ${3} | tr "[A-Z]" "[a-z]")

# generate template

if [ "$type" == "init" ]; then
  dirName="packages/${packageName}/template/${templateName}"
  mkdir ${dirName}

  echo "import { tpl_engine_init } from '@omni-door/utils';

  const tpl = 
  \`\\\`\\\${use_strict}

  \\\`\`;

  export const tpl_${templateName} = {
    tpl
  };

  export default tpl_engine_init(tpl_${templateName}, 'tpl');" > ${dirName}/index.ts
else
  dirName="packages/${packageName}/template/new/${templateName}"
  mkdir ${dirName}

  echo "import { tpl_new_init } from '@omni-door/utils';

  const tpl = 
  \`\\\`\\\${use_strict}

  \\\`\`;

  export const tpl_${templateName} = {
    tpl
  };

  export default tpl_new_init(tpl_${templateName}, 'tpl');" > ${dirName}/index.ts
fi
