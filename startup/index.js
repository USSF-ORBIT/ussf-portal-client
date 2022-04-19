/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { initLogger } = require('./logging')
const { runMigrations } = require('./migrate')
const { initTracing } = require('./tracing')
require('dotenv').config()

const requireVars = [
  'MONGO_URL',
  'MONGODB_DB',
  'REDIS_URL',
  'SAML_ISSUER',
  'SAML_IDP_METADATA_URL',
  'SAML_SSO_CALLBACK_URL',
  'SESSION_SECRET',
  'SESSION_DOMAIN',
  'MATOMO_URL',
  'MATOMO_SITE_ID',
]

function startup() {
  initLogger()

  requireVars.forEach((v) => {
    if (process.env[`${v}`] === undefined) {
      throw new Error(
        `Startup Error: required environment variable ${v} is undefined`
      )
    }
  })

  runMigrations()
  initTracing('AWSObservability')
}

startup()
