#######################################
# Stage-1 Build the app
FROM node:alpine AS builder

# set working directory
WORKDIR /app

# Copy just the packsage json files
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
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

# Prepare destination directory and ensure user node owns it
RUN mkdir -p /home/node/app/dist-frontend && mkdir -p /home/node/app/dist-backend && mkdir -p /home/node/app/logs
RUN chown -R node:node /home/node/app

WORKDIR /home/node/app

# Install only the needed production packages
COPY package*.json ./
COPY backend/package*.json ./backend/

# Set express to production
ENV NODE_ENV production
RUN yarn

COPY --chown=node:node --from=builder /app/dist-backend ./dist-backend
COPY --chown=node:node --from=builder /app/dist-frontend ./dist-frontend
COPY --chown=node:node --from=builder /app/backend/.env*  ./backend/

# Start the express server
CMD ["yarn", "workspace", "backend", "start-prod"]
