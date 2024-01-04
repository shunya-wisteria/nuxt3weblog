FROM node:lts-alpine3.18

RUN apk update && \
    apk add git && \
    apk add openssh

WORKDIR /app

ENV HOST 0.0.0.0
EXPOSE 8080
# CMD ["/bin/ash"]