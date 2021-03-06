#
# ---- Base Node ----
FROM node:12.18-alpine
WORKDIR /usr/src/wallet/fe

ENV NODE_ENV production

ENV REACT_APP_AUTH0_DOMAIN app-wallet-dev.eu.auth0.com
ENV REACT_APP_AUTH0_CALLBACK /login/callback
ENV REACT_APP_LOGIN_HOST http://localhost:3000
ENV REACT_APP_AUTH0_AUDIENCE https://walletdev.azurewebsites.net/
ENV REACT_APP_API_PREFIX https://personalwallet.azurewebsites.net/

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm install react-scripts@3.4.0 -g --silent
COPY . .

EXPOSE 3000 2222
ENTRYPOINT ["npm", "start"]