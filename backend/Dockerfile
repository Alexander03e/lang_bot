FROM node:20-alpine3.18 AS build

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .
#
#RUN yarn migration:generate
#RUN yarn migration:run
#

RUN yarn build

FROM node:20-alpine3.18

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

EXPOSE 8000

CMD ["node", "dist/main.js"]





