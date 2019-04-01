FROM docker.io/node:10.15-alpine
MAINTAINER twy

ADD ./ /usr/src/app

WORKDIR /usr/src/app

RUN npm install \
    && npm run build

VOLUME [ "/usr/src/app" ]

EXPOSE 3001
CMD ["npm","run","app"]
    