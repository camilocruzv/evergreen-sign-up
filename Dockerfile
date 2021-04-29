FROM node:alpine

WORKDIR '/app'

COPY package.json .
RUN yarn install
copy . .

EXPOSE 3000
CMD ["yarn","run","start"]

