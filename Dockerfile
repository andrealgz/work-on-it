FROM buildkite/puppeteer:10.0.0 as react-build

ARG REACT_APP_API_URL

COPY web /opt/web
WORKDIR /opt/web
RUN npm ci --only=production && npm run build

FROM node:18.13-alpine3.16

COPY api /opt/api
WORKDIR /opt/api
RUN npm ci --only=production
COPY --from=react-build /opt/web/build /opt/api/react-app

EXPOSE 3001

CMD ["npm", "start"]

