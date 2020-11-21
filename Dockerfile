# DOCKER mirror "https://mirror.ccs.tencentyun.com"
# use the following command to start
# dev: `docker run -dp 3001:3001 blog-server`
# build: `docker run -dp 8080:8080 blog-server npm run build`
FROM node:12-alpine

WORKDIR /usr/local/app

COPY ./ /usr/local/app

RUN cd /usr/local/app && npm i --registry=https://registry.npm.taobao.org

CMD npm run dev
