##--------- Stage: builder ---------##

FROM node:14.18.2-slim AS builder

RUN apt-get update \
  && apt-get -y --no-install-recommends install openssl libc6

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn build

# Install only production deps this time
RUN yarn install --production --ignore-scripts --prefer-offline

##--------- Stage: e2e ---------##

# E2E image for running tests (same as prod but without certs)
FROM node:14.18.2-slim AS e2e

RUN apt-get update \
  && apt-get -y --no-install-recommends install openssl libc6

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
FROM node:14.18.2-slim AS runner

WORKDIR /app

COPY scripts/add-rds-cas.sh .
COPY scripts/add-dod-cas.sh .
COPY scripts/create-gcds-chain.sh .
COPY dev-saml.pem /usr/local/share/ca-certificates/federation.dev.cce.af.mil.crt
COPY test-saml.pem /usr/local/share/ca-certificates/federation.test.cce.af.mil.crt
COPY prod-saml.pem /usr/local/share/ca-certificates/federation.prod.cce.af.mil.crt
COPY ./rds-combined-ca-bundle.pem ./rds-combined-ca-bundle.pem

RUN apt-get update \
  && apt-get -y --no-install-recommends install openssl libc6 ca-certificates wget unzip \
  && chmod +x add-rds-cas.sh && sh add-rds-cas.sh \
  && chmod +x add-dod-cas.sh && sh add-dod-cas.sh && chmod +x create-gcds-chain.sh && sh create-gcds-chain.sh \
  && apt-get remove -y wget unzip ca-certificates \
  && apt-get autoremove -y \
  && apt-get autoclean -y \
  && rm -rf /var/lib/apt/lists/*

ENV NODE_EXTRA_CA_CERTS='/usr/local/share/ca-certificates/GCDS.pem'
ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["node","-r","./server-preload.js", "node_modules/.bin/next", "start"]
