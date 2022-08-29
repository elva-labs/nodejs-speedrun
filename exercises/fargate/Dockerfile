FROM node:slim

WORKDIR /usr/app

COPY package.json .

RUN npm i --quiet

COPY . .

EXPOSE 3000

CMD ["src/index.js"]
