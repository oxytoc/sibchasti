#STAGE 1
FROM node:20

WORKDIR /app/web-gui

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
