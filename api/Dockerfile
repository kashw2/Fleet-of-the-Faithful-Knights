FROM node:12
WORKDIR /usr/src/ffk/api
COPY package.json ./
COPY ./dist ./
RUN npm install
CMD ["node", "./api/app.js"]
EXPOSE 8080
