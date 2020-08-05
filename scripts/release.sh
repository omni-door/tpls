#! /bin/bash
msg=$1
name="🐸  [OMNI-DOOR/TPLS]"

if [ $? -eq 0 ]
then
  git add -A
  git commit -m "${name}: ${msg}"
  git push
  echo -e "\033[32m \n${name}: The git-repo push success\n \033[0m"
else
  echo -e "\033[31m \n${name}: The git-repo push failed!\n \033[0m"
fi