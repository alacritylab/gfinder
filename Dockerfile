FROM node:alpine

WORKDIR /app

ENV NODE_ENV development
COPY package.json ./
RUN yarn

COPY . .
COPY .env.docker-compose .env
EXPOSE 3000

COPY docker/gfinder-docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

CMD [ "yarn", "start:dev" ]
