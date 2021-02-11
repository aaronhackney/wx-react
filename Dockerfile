#######################################
# Stage-1 Build the app
FROM node:alpine AS builder

# Set express to production
ENV NODE_ENV production

# set working directory
WORKDIR /app

# Copy just the packsage json files
COPY ./backend/package.json ./backend/
COPY ./frontend/package.json ./frontend/
COPY package.json ./

# Install the node libraries
RUN npm install yarn
RUN rm package-lock.json
RUN yarn

# Copy the sourcecode to the container
COPY . ./

# Build the frontend webpack
RUN yarn workspace frontend build

# Build express server production
RUN yarn workspace backend build

#######################################
# Stage 2 - Get the build and run it
FROM builder

# Start the express server
CMD ["yarn", "workspace", "backend", "start-prod"]
