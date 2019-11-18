rm -rf ./dist
mkdir dist
for file in "package.json index.js ecosystem.config.js pages"
do
  cp -R $file ./dist
done

rsync -v -r ./dist/* root@128.199.216.159:/root/embed
