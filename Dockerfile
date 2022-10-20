##--------- Stage: builder ---------##

FROM node:14.20.1-slim AS builder

RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get -y --no-install-recommends install openssl libc6

WORKDIR /app

COPY ["package*.json", "yarn.lock", "./"]

COPY ./scripts/ /app/scripts/

RUN yarn install --frozen-lockfile

COPY ["codegen.yml", "next.config.js", "tsconfig.json", "./"]

COPY ./src/ /app/src/

RUN yarn prebuild

COPY ["*.ts", ".eslintignore", ".eslintrc.json", "babel.config.js", "./"]

COPY ./public/ /app/public/

RUN yarn build

# Install only production deps this time
RUN yarn install --production --ignore-scripts --prefer-offline

ARG BUILD

ENV NEXT_TELEMETRY_DISABLED 1
ENV IMAGE_TAG=${BUILD}

COPY . .

##--------- Stage: e2e ---------##

# E2E image for running tests (same as prod but without certs)
FROM node:14.20.1-slim AS e2e

RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get -y --no-install-recommends install openssl libc6

WORKDIR /app

# Copy files needed for startup
COPY ./startup ./startup
COPY ./migrations ./migrations
COPY ./utils ./utils

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["node","-r","./startup/index.js", "node_modules/.bin/next", "start"]

##--------- Stage: build-env ---------##

# Production image, copy all the files and run next
FROM node:14.20.1-slim AS build-env

WORKDIR /app

COPY --from=builder /app/scripts/add-rds-cas.sh .
COPY --from=builder /app/scripts/add-dod-cas.sh .
COPY --from=builder /app/scripts/create-gcds-chain.sh .
COPY --from=builder /app/dev-saml.pem /usr/local/share/ca-certificates/federation.dev.cce.af.mil.crt
COPY --from=builder /app/test-saml.pem /usr/local/share/ca-certificates/federation.test.cce.af.mil.crt
COPY --from=builder /app/prod-saml.pem /usr/local/share/ca-certificates/federation.prod.cce.af.mil.crt

RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get -y --no-install-recommends install openssl libc6 ca-certificates wget unzip zlib1g \
  && chmod +x add-rds-cas.sh && sh add-rds-cas.sh \
  && chmod +x add-dod-cas.sh && sh add-dod-cas.sh && chmod +x create-gcds-chain.sh && sh create-gcds-chain.sh

##--------- Stage: runner ---------##

FROM gcr.io/distroless/nodejs:14 AS runner

COPY --from=build-env /lib/x86_64-linux-gnu/libz*  /lib/x86_64-linux-gnu/
COPY --from=build-env /lib/x86_64-linux-gnu/libexpat*  /lib/x86_64-linux-gnu/
COPY --from=build-env /lib/x86_64-linux-gnu/libhistory*  /lib/x86_64-linux-gnu/
COPY --from=build-env /lib/x86_64-linux-gnu/libreadline*  /lib/x86_64-linux-gnu/

WORKDIR /app

COPY ./startup ./startup
COPY ./migrations ./migrations
COPY ./utils ./utils
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=build-env /etc/ssl/certs /etc/ssl/certs
COPY --from=build-env /usr/local/share/ca-certificates /usr/local/share/ca-certificates


ENV NODE_EXTRA_CA_CERTS='/usr/local/share/ca-certificates/GCDS.pem'
ENV NODE_ENV production

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["-r","./startup/index.js", "node_modules/.bin/next", "start"]
