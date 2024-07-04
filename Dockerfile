FROM node:20

WORKDIR /tb1-app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY . .
RUN yarn build

CMD ["yarn", "start"]
