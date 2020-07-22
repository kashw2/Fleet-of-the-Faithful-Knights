FROM node:12
WORKDIR /usr/src/ffk/api
COPY ./dist ./
COPY package.json ./
RUN npm install
CMD ["node", "./api/app.js"]
EXPOSE 8080
