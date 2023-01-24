/!bin/zsh
hugo -D  -F --cleanDestinationDir

cp -r public/ ../github-site

cd ../github-site

git add . 

git commit -m "hugo: update site"

git push -u origin master
