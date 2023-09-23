FROM node:alpine

WORKDIR /src

COPY package*.json .

RUN npm ci --only=production

COPY . .

RUN npm install typescript

RUN npx tsc

CMD ["node", "./build/index.js"]