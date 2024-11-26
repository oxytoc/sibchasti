#STAGE 1
FROM node:20 as build
WORKDIR /app/web-gui
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

#STAGE 2
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/web-gui/dist/web-gui/browser /usr/share/nginx/html
