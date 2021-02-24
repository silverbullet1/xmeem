FROM node:14
WORKDIR /usr/src/app
COPY backend/package*.json ./
RUN npm install
COPY backend/. .
EXPOSE 8081
ENV DB_URL mongodb://mongo:27017/memes
CMD [ "node", "app.js" ]