# Install dependencies only when needed
FROM node:14.18.1-slim AS builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
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

# Production image, copy all the files and run next
FROM node:14.18.1-slim AS runner

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apt-get update \
  && apt-get -y install openssl libc6

WORKDIR /app

# TODO: where to store certs?
COPY ./certs/DoD_CAs.pem /etc/ssl/certs/DoD_CAs.pem

ENV NODE_EXTRA_CA_CERTS='/etc/ssl/certs/DoD_CAs.pem'
ENV NODE_ENV production

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["node_modules/.bin/next", "start"]
