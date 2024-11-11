ARG NODE_VERSION=20

FROM node:${NODE_VERSION}

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]
