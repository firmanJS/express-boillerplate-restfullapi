#stage 1
FROM node:16-alpine as base

WORKDIR /usr/apps

COPY package*.json ./

#stage 2
FROM base as production

ENV NODE_ENV=production

RUN yarn install && yarn cache clean --all

COPY . .

CMD ["yarn", "dev"]