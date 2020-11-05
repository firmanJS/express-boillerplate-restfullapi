FROM node:14-alpine

WORKDIR /usr/apps

COPY package*.json ./

RUN npm install && npm cache clean --force

CMD ["npm", "run", "dev"]