#!/usr/bin/env bash

if [[ "$CI" == "true" && "$TRAVIS_PULL_REQUEST" != "false"  && "$TRAVIS_BRANCH" != "master" ]]; then
  echo "Skipping deploy - this is not master"
  exit 0
fi

cd build

# Deploy to main site
git init
git config user.name "Jacob Gillespie"
git config user.email "jacobwgillespie@gmail.com"
git add .
git commit -m "Deploy to GitHub Pages"
git push --force --quiet "https://${GH_TOKEN}@github.com/jacobwgillespie/halfstaff" master:gh-pages > /dev/null 2>&1

# Reset git
rm -rf .git

# Set CDN host
echo "cdn.halfstaff.co" > CNAME

# Remove all HTML files
find . -name '*.html' -type f -delete
find . -name '*.html.gz' -type f -delete

# Deploy to CDN
git init
git config user.name "Jacob Gillespie"
git config user.email "jacobwgillespie@gmail.com"
git add .
git commit -m "Deploy to GitHub Pages"
git push --force --quiet "https://${GH_TOKEN}@github.com/jacobwgillespie/halfstaff-cdn" master:gh-pages > /dev/null 2>&1
