FROM node:20.10.0-alpine3.19
RUN apk add --no-cache make g++
RUN apk add --no-cache python3
RUN ln -sf python3 /usr/bin/python
WORKDIR /app
COPY package.json ./
RUN npm install && npm install typescript -g
COPY . .
CMD ["npm", "start"]