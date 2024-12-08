FROM node:22-bullseye-slim

WORKDIR /usr/src/app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    tini \
    && apt-get upgrade -y libncurses6 \
    && rm -rf /var/lib/apt/lists/*

ENTRYPOINT [ "/usr/bin/tini", "--" ]

COPY package*.json ./ tsconfig.json ./

RUN yarn && yarn build && yarn cache clean

ADD . .

EXPOSE 3000

CMD [ "node", "dist/main.js" ]