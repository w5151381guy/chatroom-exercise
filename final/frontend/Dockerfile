FROM node:10-alpine AS build

WORKDIR /app
ADD package.json yarn.lock webpack.config.js webpack.prod.js /app/
ADD ./src /app/src
RUN npm install -g yarn  
RUN yarn
RUN yarn run build

# ========== Use nginx to serve static file ==========
FROM nginx:1.14-alpine

COPY --from=build /app/dist /app/dist
COPY --from=build /app/src/index.html /app/

COPY nginx.conf /etc/nginx/nginx.conf

RUN nginx -t

EXPOSE 80