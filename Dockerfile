FROM node:14-alpine

WORKDIR /usr/apps

COPY package*.json ./

RUN yarn install && yarn cache clean --all

CMD ["yarn", "dev"]