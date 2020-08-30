#!/usr/bin/env sh

set -e

npm run build

cd dist

git init

git add -A

git commit -m "deploy"

git push -f https://github.com/CSY54/nctu-timetable-plus.git master:gh-pages

cd -
