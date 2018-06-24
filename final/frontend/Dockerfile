FROM node:10-alpine AS build

WORKDIR /app
ADD package.json package-lock.json webpack.config.prod.js /app/
ADD ./src /app/src
ADD ./public /app/public
RUN npm ci 
RUN npm run build

EXPOSE 80
