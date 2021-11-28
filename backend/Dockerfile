FROM node:16.13

RUN npm i -g @nestjs/cli

WORKDIR /backend
COPY package*.json /backend/

RUN yarn install
CMD [ "yarn", "run", "start:dev"]
