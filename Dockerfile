FROM node:18-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build


CMD [ "ts-node","main.ts", "echo","🚀 server is running 🚀"]