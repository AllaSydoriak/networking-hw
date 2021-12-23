FROM node:17-alpine3.12

WORKDIR /app

COPY package.json /app

RUN npm install
RUN npm install pm2 -g

COPY . /app

EXPOSE 8080

CMD ["pm2-runtime", "ecosystem.config.cjs", "--env", "development"]