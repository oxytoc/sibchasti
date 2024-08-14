ARG NODE_VERSION=20

FROM node:${NODE_VERSION}

# RUN apk add --no-cache python3 py3-pip py3-scikit-learn py3-pandas py3-numpy
RUN apt-get update
RUN apt-get install -y python3 python3-pip python3-sklearn python3-sklearn-lib python3-pandas


WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]
