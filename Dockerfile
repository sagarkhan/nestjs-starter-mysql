FROM node:16-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY .npmrc ./
RUN npm install
COPY . .
RUN npm run build && npm prune --production
RUN rm -rf src
CMD ["node", "dist/main"]