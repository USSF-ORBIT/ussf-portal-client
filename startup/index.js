/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

// const { initLogger } = require('./logging')
const { runMigrations } = require('./migrate')
const { initTracing } = require('./tracing')
require('dotenv').config()

const requireVars = [
  'MONGO_HOST',
  'MONGO_USER',
  'MONGO_PASSWORD',
  'REDIS_URL',
  'SAML_ISSUER',
  'SAML_IDP_METADATA_URL',
  'SESSION_SECRET',
  'SESSION_DOMAIN',
  'KEYSTONE_URL',
  'LAUNCHDARKLY_SDK_CLIENT_SIDE_ID',
  'PERSONNEL_API_URL',
]

function startup() {
  // #TODO: Loop back to this after some time has passed, and decide if we would like a more
  // comprehensive logging solution.
  //
  // Disabling logging for now. Upgrading to Next 13 resulted in part of our
  // logging functionality breaking, and we decided to disable our custom solution
  // for now and use the default Next.js logging.
  // initLogger()

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
