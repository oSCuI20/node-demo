FROM debian:bullseye-slim as nodejs-build

ARG NODE_VERSION
ARG APP_HOME

ENV DEBIAN_FRONTEND nonintecractive

RUN apt-get update -qy
RUN apt-get install --no-install-recommends -fy \
        curl \
        vim \
        ca-certificates \
        procps && \
    rm -Rf /var/lib/apt/lists/*

RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o /tmp/install-node.sh && \
    bash /tmp/install-node.sh $NODE_VERSION && \
    rm -f /tmp/install-node.sh 

COPY ./compose/develop/nodejs/scripts/entrypoint.sh /entrypoint.sh 
RUN chmod +x /entrypoint.sh 

COPY ./compose/develop/nodejs/scripts/start.sh /start.sh 
RUN chmod +x /start.sh 

RUN export NODE_HOME=${APP_HOME}/node_modules
WORKDIR ${APP_HOME}

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "/start.sh" ]
