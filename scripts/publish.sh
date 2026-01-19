#! /bin/bash
pkgName=$1
name="🐸  [OMNI-DOOR/${pkgName}]"

if [ $? -eq 0 ]
then
  pkjV=$(grep \"version\" package.json)
  version=$(echo ${pkjV} | tr -cd "[0-9].")
  npm publish --provenance --access public --registry='https://registry.npmjs.org'
  echo -e "\033[32m \n${name}: The npm-package publish success - ${version}\n \033[0m"
else
  echo -e "\033[31m \n${name}: The npm-package publish failed!\n \033[0m"
fi