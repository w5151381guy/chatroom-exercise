FROM node:10-alpine AS build

WORKDIR /app
ADD package.json yarn.lock webpack.config.js webpack.dev.js webpack.prod.js /app/
ADD ./src /app/src
RUN npm install -g yarn  
RUN yarn
RUN yarn run dev

# ========== Use nginx to serve static file ==========
FROM nginx:1.14-alpine

COPY --from=build /app/dist /app/dist
COPY nginx.conf /etc/nginx/nginx.conf

RUN nginx -t

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s \
    CMD wget --spider --tries=1 localhost/ localhost/home localhost/bundle.js || exit 1
