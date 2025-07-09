FROM node:22.14.0-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT ["node", "index.js"]