# DOCKER mirror "https://mirror.ccs.tencentyun.com"
# use the following command to start
# dev: `docker run -dp 3001:3001 -w /usr/local/app blog-server npm run dev`
# build: `docker run -dp 80:80 -w /usr/local/app blog-server npm run start`
FROM node:12-alpine
WORKDIR /blog-server
COPY ./ /usr/local/app
RUN cd /usr/local/app && npm i --registry=https://registry.npm.taobao.org
