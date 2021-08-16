/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/* eslint @typescript-eslint/no-var-requires: "off"*/
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const { lighthouse, pa11y, prepareAudit } = require('cypress-audit')
/**
 * @type {Cypress.PluginConfig}
 */
const storeData = async (data, filepath) => {
  try {
    await mkdirp(path.dirname(filepath))
    fs.writeFile(filepath, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions)
  })

  on('task', {
    lighthouse: lighthouse((report) => {
      const filepath = path.resolve('cypress', 'reports/lighthouse_report.json')
      storeData(report, filepath)
    }),
    pa11y: pa11y((report) => {
      const filepath = path.resolve('cypress', 'reports/pa11y_report.json')
      storeData(report, filepath)
    }),
  })
}
