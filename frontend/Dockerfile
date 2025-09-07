FROM node:22.16.0-alpine

RUN mkdir -p /frontend

COPY . /frontend

WORKDIR /frontend

RUN npm install

CMD ["npm", "run", "dev"]