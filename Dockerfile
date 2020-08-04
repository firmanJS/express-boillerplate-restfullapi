FROM node:14-alpine

WORKDIR /apps

COPY package*.json ./

RUN npm install

CMD ["npm", "start"]