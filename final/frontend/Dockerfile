FROM node:10-alpine AS build

WORKDIR /app
ADD package.json package-lock.json webpack.prod.js /app/
ADD ./src /app/src
RUN npm ci 
RUN npm run build

EXPOSE 80
