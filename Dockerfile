FROM node:14-alpine

COPY . app/

WORKDIR app/

RUN npm install --quiet -g node-gyp

RUN yarn install

RUN yarn build

ENV NODE_ENV production

ENTRYPOINT yarn start