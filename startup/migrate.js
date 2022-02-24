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

      console.log('[MIGRATION] Run migrations')

      set.on('migration', function (migration, direction) {
        console.log(`[MIGRATION - ${direction}] ${migration.title}`)
      })

      set.up(function (err) {
        if (err) {
          throw err
        }

        console.log('[MIGRATION] Migrations successful')
      })
    }
  )
}

module.exports.runMigrations = runMigrations
