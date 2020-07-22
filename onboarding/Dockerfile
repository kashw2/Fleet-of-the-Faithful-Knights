FROM node:12
WORKDIR /usr/src/ffk/onboarding
COPY ./dist ./
COPY package.json ./
RUN npm install
CMD ["node", "./onboarding/app.js"]
EXPOSE 8008
