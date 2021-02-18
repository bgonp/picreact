FROM node:14.15.5-alpine

WORKDIR /picreact

COPY package.json ./
COPY package-lock.json ./

RUN npm i -g -E serve@11.3
RUN npm i -s

COPY . ./
RUN npm run build -s

CMD ["serve", "./build", "-l", "5000", "-n"]
