#
# ---- Base Node ----
FROM node:10.16.3-alpine

# set working directory
WORKDIR /usr/src/wallet/fe

ENV NODE_ENV production

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD npm start