# Build Stage
FROM node:alpine as build

# Set working directory
WORKDIR /sk 

# Copy the entire current directory into the container
COPY . .

# Remove existing node_modules and build directories
RUN rm -rf node_modules
RUN rm -rf build

# Install dependencies and build the application
RUN npm install
RUN npm run build

# Run Stage
FROM node:alpine as run

# Set working directory
WORKDIR /sk

# Copy built application files from the build stage
COPY --from=build /sk/build /sk/build

# Copy package.json and package-lock.json
COPY package.json /sk/package.json
COPY package-lock.json /sk/package-lock.json

# Install production dependencies
RUN npm install --production

# Expose port 3000
EXPOSE 3000

# Set the entrypoint to run the application
ENTRYPOINT [ "npm", "run", "start"]