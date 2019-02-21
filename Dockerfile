FROM daocloud.io/node:8.4.0-onbuild
MAINTAINER twy

ADD ./ /opt/myApp

WORKDIR /opt/myApp

RUN cd /opt/myApp/fronted \
    && echo hello world \
    && npm run build \
    && cd /opt/myApp/server \
    && npm install

VOLUME [ "/opt/myApp" ]
ENTRYPOINT [ "myApp" ]

EXPOSE 3001
    