#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

sudo /usr/bin/pm2 kill
npm i
# sudo /usr/bin/yarn db:pull # when use prisma
# sudo /usr/bin/yarn generate # when use prisma
npm run typeorm migration:run -- -d dist/ormconfig.js
sudo mv .env dist/src/
cd dist/src
sudo /usr/bin/pm2 start main.js