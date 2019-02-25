FROM daocloud.io/node:8.4.0-onbuild
MAINTAINER twy

ADD ./ /usr/src/app

WORKDIR /usr/src/app

VOLUME [ "/usr/src/app" ]

EXPOSE 3001
ENTRYPOINT ["npm run", "app"]
    