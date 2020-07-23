FROM node:12
WORKDIR /usr/src/ffk/onboarding
COPY package.json ./
COPY ./dist ./
RUN npm install
CMD ["node", "./onboarding/app.js"]
EXPOSE 8008
