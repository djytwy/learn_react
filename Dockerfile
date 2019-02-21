FROM daocloud.io/node:8.4.0-onbuild
MAINTAINER twy

ADD ./ /usr/src/app

RUN cd /usr/src/app/fronted \
    && echo hello world \
    && npm run build \
    && cd usr/src/app/server \
    && npm install
    
WORKDIR /usr/src/app

VOLUME [ "/usr/src/app" ]
ENTRYPOINT [ "app" ]

EXPOSE 3001
    