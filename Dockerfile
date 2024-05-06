FROM node:alpine AS build

WORKDIR /app

COPY sk .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
