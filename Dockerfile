#
# ---- Base Node ----
FROM node:12.18-alpine

# set working directory
WORKDIR /usr/src/wallet/fe

ENV NODE_ENV production

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm install react-scripts@3.4.1 -g --silent
COPY . .
EXPOSE 3000
ENTRYPOINT ["npm", "start"]