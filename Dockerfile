##--------- Stage: builder ---------##
# Node image variant name explanations: "bullseye" is the codeword for Debian 11, and "slim" only contains the minimal packages needed to run Node
FROM node:18.17.0-bullseye-slim AS builder

RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get -y --no-install-recommends install openssl libc6 zlib1g

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

ENV NEXT_TELEMETRY_DISABLED 1

COPY . .

##--------- Stage: e2e ---------##

# E2E image for running tests (same as prod but without certs)
FROM gcr.io/distroless/nodejs18-debian11 AS e2e
# The below image is an arm64 debug image that has helpful binaries for debugging, such as a shell, for local debugging
# FROM gcr.io/distroless/nodejs:16-debug-arm64 AS e2e

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

ARG BUILD
ENV BUILD_ID=${BUILD}

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["-r","./startup/index.js", "node_modules/.bin/next", "start"]

##--------- Stage: build-env ---------##

# Production image, copy all the files and run next
FROM node:18.17.0-bullseye-slim AS build-env

WORKDIR /app

COPY --from=builder /app/scripts/add-rds-cas.sh .
COPY --from=builder /app/scripts/add-dod-cas.sh .
COPY --from=builder /app/scripts/dod_ca_cert_bundle.sha256 ./scripts/dod_ca_cert_bundle.sha256

RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get -y --no-install-recommends install ca-certificates libc6 openssl unzip wget zlib1g

RUN chmod +x add-rds-cas.sh && bash add-rds-cas.sh
RUN chmod +x add-dod-cas.sh && bash add-dod-cas.sh
RUN cat /usr/local/share/ca-certificates/DoD_Root_CA_3.crt > /usr/local/share/ca-certificates/GCDS.pem

##--------- Stage: runner ---------##

FROM gcr.io/distroless/nodejs18-debian11 AS runner
# The below image is an arm64 debug image that has helpful binaries for debugging, such as a shell, for local debugging
# FROM gcr.io/distroless/nodejs:16-debug-arm64 AS runner

WORKDIR /app

COPY ./startup ./startup
COPY ./migrations ./migrations
COPY ./utils ./utils
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

COPY --from=build-env  ["/app/rds-combined-ca-bundle.pem", "/app/rds-combined-ca-us-gov-bundle.pem", "/app/us-gov-west-1-bundle.pem", "./"]
COPY --from=build-env /usr/local/share/ca-certificates /usr/local/share/ca-certificates
COPY --from=build-env /usr/share/ca-certificates /usr/share/ca-certificates
COPY --from=build-env /etc/ssl/certs/ /etc/ssl/certs/


ENV NODE_EXTRA_CA_CERTS='/usr/local/share/ca-certificates/GCDS.pem'
ENV NODE_ENV production

EXPOSE 3000

ARG BUILD
ENV BUILD_ID=${BUILD}

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["-r","./startup/index.js", "node_modules/.bin/next", "start"]
