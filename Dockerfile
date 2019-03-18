FROM docker.io/node:10.15-alpine
MAINTAINER twy

ADD ./ /usr/src/app

WORKDIR /usr/src/app

VOLUME [ "/usr/src/app" ]

EXPOSE 3001
CMD ["npm","run","app"]
    