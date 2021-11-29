##--------- Stage: builder ---------##

FROM node:14.18.1-slim AS builder

RUN apt-get update \
  && apt-get -y install openssl libc6

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn build

# Install only production deps this time
RUN yarn install --production --ignore-scripts --prefer-offline

##--------- Stage: e2e ---------##

# E2E image for running tests (same as prod but without certs)
FROM node:14.18.1-slim AS e2e

RUN apt-get update \
  && apt-get -y install openssl libc6

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["node_modules/.bin/next", "start"]

##--------- Stage: runner ---------##

# Production image, copy all the files and run next
FROM node:14.18.1-slim AS runner

RUN apt-get update \
  && apt-get -y install openssl libc6 ca-certificates

WORKDIR /app

# TODO: where to store certs for CI builds?
COPY ./certs/DoD_CAs.pem /etc/ssl/certs/DoD_CAs.pem
RUN update-ca-certificates

ENV NODE_EXTRA_CA_CERTS='/etc/ssl/certs/DoD_CAs.pem'
ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["node_modules/.bin/next", "start"]
