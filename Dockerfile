# pull official base image
FROM node:alpine

# set working directory
WORKDIR /app

# Copy the sourcecode to the container
COPY . ./

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install yarn
RUN rm package-lock.json
RUN yarn
RUN yarn workspace frontend build
RUN rm -Rf ./frontend
CMD ["yarn", "workspace", "backend", "start"]
