#STAGE 1
FROM node:20

WORKDIR /app/web-gui

COPY package*.json ./

RUN npm install

EXPOSE 4200

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]
