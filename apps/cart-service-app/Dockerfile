FROM node:18-alpine as builder
WORKDIR /app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
COPY /dist .
RUN npm install -g npm && npm ci && npm install @aws-sdk/lib-dynamodb

FROM alpine as production
RUN apk add --update nodejs

COPY --from=builder /app /app
WORKDIR /app
ENV PORT=3333
EXPOSE ${PORT}

CMD node ./main.js
