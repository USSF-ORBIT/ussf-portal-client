/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const { initLogger } = require('./logging')
const { runMigrations } = require('./migrate')

function startup() {
  initLogger()
  runMigrations()
}

startup()
