/* eslint-disable @typescript-eslint/no-var-requires */
var migrate = require('migrate')

function runMigrations() {
  migrate.load(
    {
      stateStore: '.migrate',
    },
    function (err, set) {
      if (err) {
        throw err
      }

      console.info('[MIGRATION] Run migrations')

      set.on('migration', function (migration, direction) {
        console.info(`[MIGRATION - ${direction}] ${migration.title}`)
      })

      set.up(function (err) {
        if (err) {
          throw err
        }

        console.info('[MIGRATION] Migrations successful')
      })
    }
  )
}

module.exports.runMigrations = runMigrations
