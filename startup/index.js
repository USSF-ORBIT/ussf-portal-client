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
  'SESSION_SECRET',
  'SESSION_DOMAIN',
  'KEYSTONE_URL',
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
