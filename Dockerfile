##--------- Stage: builder ---------##

FROM node:14.19.1-slim AS base

WORKDIR /app

COPY scripts/add-rds-cas.sh .
COPY scripts/add-dod-cas.sh .
COPY scripts/create-gcds-chain.sh .
COPY dev-saml.pem /usr/local/share/ca-certificates/federation.dev.cce.af.mil.crt
COPY test-saml.pem /usr/local/share/ca-certificates/federation.test.cce.af.mil.crt
COPY prod-saml.pem /usr/local/share/ca-certificates/federation.prod.cce.af.mil.crt

RUN apt-get update \
  && apt-get -y --no-install-recommends install openssl libc6 ca-certificates wget unzip dumb-init \
  && chmod +x add-rds-cas.sh && sh add-rds-cas.sh \
  && chmod +x add-dod-cas.sh && sh add-dod-cas.sh && chmod +x create-gcds-chain.sh && sh create-gcds-chain.sh \
  && apt-get remove -y wget unzip ca-certificates \
  && apt-get autoremove -y \
  && apt-get autoclean -y \
  && rm -rf /var/lib/apt/lists/*
COPY package.json .
COPY yarn.lock .

##--------- Stage: builder ---------##
FROM base as builder

WORKDIR /app
ARG BUILD
ENV NEXT_TELEMETRY_DISABLED 1
ENV IMAGE_TAG=${BUILD}

COPY . .

RUN yarn install --frozen-lockfile && yarn build && yarn install --production --ignore-scripts --prefer-offline


##--------- Stage: e2e ---------##

# E2E image for running tests (same as prod but without certs)
FROM builder AS e2e

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
CMD ["bash", "-c", "node -r /app/startup/index.js /app/node_modules/.bin/next start"]

##--------- Stage: runner ---------##

# Production image, copy all the files and run next
FROM gcr.io/distroless/nodejs:14 AS runner

WORKDIR /app

# Copy files needed for startup
COPY ./startup ./startup
COPY ./migrations ./migrations
COPY ./utils ./utils

# Copy certs
COPY --from=builder /usr/local/share/ca-certificates /usr/local/share/ca-certificates
COPY --from=builder /app/*.pem ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["./startup/index.js"]