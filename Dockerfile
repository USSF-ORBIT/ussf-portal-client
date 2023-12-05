##--------- Stage: builder ---------##
# Node image variant name explanations: "bookworm" is the codeword for Debian 12, and "slim" only contains the minimal packages needed to run Node
# FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs18:18.18.2-slim AS builder
FROM node:18.17.0-bookworm-slim AS builder

WORKDIR /app

COPY ["package*.json", "yarn.lock", "./"]

COPY ./scripts/copy_uswds_assets.sh /app/scripts/

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
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs18:18.18.2-slim AS e2e
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

##--------- Stage: build-openssl ---------##
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs18:18.18 AS build-openssl

##--------- Stage: build-env ---------##

# Production image, copy all the files and run next
FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs18:18.18.2-slim AS build-env

WORKDIR /app

COPY --from=builder /app/scripts/add-rds-cas.sh .
COPY --from=builder /app/scripts/add-dod-cas.sh .

COPY --from=build-openssl /bin/openssl /bin/openssl
COPY --from=build-openssl /lib64/ /lib64/

USER root
COPY --from=builder /app/fetch-manifest-resources/ /app/fetch-manifest-resources/
RUN chmod +x add-dod-cas.sh && sh add-dod-cas.sh
RUN cat /usr/local/share/ca-certificates/DoD_Root_CA_3.crt > /usr/local/share/ca-certificates/GCDS.pem

##--------- Stage: runner ---------##

FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs18:18.18.2-slim AS runner
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

COPY --from=build-openssl /bin/openssl /bin/openssl
COPY --from=build-openssl /lib64/ /lib64/

COPY --from=build-env  /app/fetch-manifest-resources/ ./
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
