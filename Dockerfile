FROM daocloud.io/node:8.4.0-onbuild
MAINTAINER twy

RUN cd /usr/src/app/fronted \
    && echo hello world \
    && npm run build \
    && cd usr/src/app/server \
    && npm install

ADD ./ /usr/src/app

WORKDIR /usr/src/app

VOLUME [ "/usr/src/app" ]
ENTRYPOINT [ "app" ]

EXPOSE 3001
    