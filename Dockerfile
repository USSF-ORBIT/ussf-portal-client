# Install dependencies only when needed
FROM node:14.18.1-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app
# COPY package.json yarn.lock ./
# We need to copy everything as long as we're using embedded Keystone
COPY . .

RUN yarn install --frozen-lockfile

# Build source code
FROM node:14.18.1-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Build the app
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn build

# Install production deps only
RUN rm -rf node_modules && yarn install --production --ignore-scripts --prefer-offline

# Prune unnecessary node files
RUN apk --no-cache add curl
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | /bin/sh -s -- -b /usr/local/bin
RUN /usr/local/bin/node-prune

# Production image, copy all the files and run next
FROM gcr.io/distroless/nodejs:14 AS runner
WORKDIR /app

ENV NODE_ENV production

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# USER nextjs

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
CMD ["node_modules/.bin/next", "start"]
