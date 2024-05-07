# Build
FROM node:alpine as build

WORKDIR /sk
COPY package*.json ./
RUN rm -rf node_modules
RUN rm -rf build

COPY . .

RUN npm install
RUN npm run build

# Run
FROM node:alpine as run

WORKDIR /sk
COPY --from=build /sk/build /sk/build
COPY package.json /sk/package.json
COPY package-lock.json /sk/package-lock.json

RUN npm install --production

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start"]