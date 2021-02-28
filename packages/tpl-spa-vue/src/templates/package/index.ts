import { tplEngineInit } from "@omni-door/utils";

const tpl = 
`\`{
  "name": "\${project_name.toLowerCase()}",
  "version": "0.0.1",
  "description": "",
  "scripts": {
    "start": "omni dev",
    "dev": "omni dev",
    "new": "omni new",
    "build": "omni build",
    "release": "omni release"
  },
  "keywords": [],
  "author": "",
  \${\!install \? dependencies \: }
  \${\!install \? devDependencies \: }
  "omni": {
    "filePath": "./configs/omni.config.js"
  },
  "license": "ISC"
}
\``;

export const tpl_package = {
  tpl
};

export default tplEngineInit(tpl_package, "tpl");
