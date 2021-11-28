FROM node:16.13
WORKDIR /frontend

WORKDIR /frontend
COPY package*.json /frontend/

RUN yarn install
CMD [ "yarn", "run", "dev"]
