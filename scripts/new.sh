#! /bin/bash

packageName=$(echo ${1} | tr "[A-Z]" "[a-z]")
templateName=$(echo ${2} | tr "[A-Z]" "[a-z]")
type=$(echo ${3} | tr "[A-Z]" "[a-z]")
dirName="packages/${packageName}/src/templates"

# generate template

if [ "$type" == "init" ]; then
  tplPath="${dirName}/${templateName}"
  mkdir ${tplPath}

  echo "import { tpl_engine_init } from '@omni-door/utils';

  const tpl = 
  \`\\\`\\\${use_strict}

  \\\`\`;

  export const tpl_${templateName} = {
    tpl
  };

  export default tpl_engine_init(tpl_${templateName}, 'tpl');" > ${tplPath}/index.ts
else
  tplPath="${dirName}/new"

  echo "import { tpl_engine_new } from '@omni-door/utils';

  const tpl = 
  \`\\\`\\\${use_strict}

  \\\`\`;

  export const tpl_${templateName} = {
    tpl
  };

  export default tpl_engine_new(tpl_${templateName}, 'tpl');" > ${tplPath}/${templateName}.ts
fi
