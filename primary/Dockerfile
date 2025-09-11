FROM node:23 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install


FROM base AS developement
COPY . .
EXPOSE 4000
CMD [ "npm","run","dev"]



FROM base AS production
COPY . .
EXPOSE 4000
RUN npm prune --production
CMD ["npm", "run" ,"start"]
