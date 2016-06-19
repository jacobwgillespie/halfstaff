#!/bin/bash

commit() {
  message="Automatic update at $(date)"
  git add -A && git commit -av -m "$message"
  git push origin master
}

rm -rf .tmp/repo
mkdir -p .tmp/node_modules
git clone --depth=1 https://github.com/jacobwgillespie/halfstaff.git .tmp/repo
cd .tmp/repo

ln -s ../node_modules node_modules
npm install

npm run fetch-potus
npm run build-data

if $(! git status -s &> /dev/null)
then
  echo "git error"
else
  if [[ $(git status --porcelain) == "" ]]
  then
    echo "up to date"
  else
    echo "has changes"
    commit
  fi
fi

cd ..

rm -rf .tmp/repo
