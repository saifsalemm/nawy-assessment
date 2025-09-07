FROM node:22.16.0-alpine

RUN mkdir -p /backend

COPY . /backend

WORKDIR /backend

RUN npm install

CMD ["npm", "run", "start"]
