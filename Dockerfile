# Start your image with a node base image
FROM node:20

# The /app directory should act as the main application directory
WORKDIR /usr/src/app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install

# Copy local directories to the current local directory of our docker image (/app)
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the app using serve command
CMD [ "node", "dist/main" ]