/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { initLogger } = require('./logging')
const { runMigrations } = require('./migrate')
const { initTracing } = require('./tracing')
function startup() {
  initLogger()
  runMigrations()
  initTracing('AWSObservability')
}

startup()
