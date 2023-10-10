'use strict'
// Set up logging for Next.js before server starts.
// Ref: https://jake.tl/notes/2021-04-04-nextjs-preload-hack

/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Set up logging. Monkey patches a bunch of stuff.
 */
function setUpLogging() {
  // pino is a simple JSON logger
  // By default it logs to STDOUT.

  const { pino } = require('pino')

  const logger = pino({})

  // const testCircular = { a: 1, b: 2, c: 3 }
  // testCircular.d = testCircular

  function getLoggingFunction(/** @type {string} */ levelName) {
    // levelName is passed in by this setup code when calling this function
    // not user input
    // eslint-disable-next-line security/detect-object-injection
    const baseLogFn = (logger[levelName] || logger.info).bind(logger)
    return function patchedLog(/** @type {any[]} */ ...parts) {
      /** @type {object | undefined} */
      let data = undefined
      /** @type {object | undefined} */
      let error = undefined

      /** @type {object | undefined} */
      const nativeError = parts.find(
        (it) =>
          (it && it instanceof Error) ||
          (it && typeof it === 'object' && 'name' in it && 'message' in it)
      )

      if (nativeError) {
        error = cleanObjectForSerialization(nativeError)
        // If you use Sentry, Rollbar, etc, you could capture the error here.
        // ErrorThingy.report(nativeError)
      }

      // If next is trying to log funky stuff, put it into the data object.
      if (parts.length > 1) {
        data = data || {}
        data.parts = parts.map((part) => cleanObjectForSerialization(part))
      }

      const messages =
        nativeError && parts.length === 1 ? [nativeError.toString()] : parts

      baseLogFn({ data, error, type: levelName }, ...messages)
    }
  }

  // Monkey-patch Next.js logger.
  // See https://github.com/atkinchris/next-logger/blob/main/index.js
  // See https://github.com/vercel/next.js/blob/canary/packages/next/build/output/log.ts
  const nextBuiltInLogger = require('next/dist/build/output/log')
  for (const [property, value] of Object.entries(nextBuiltInLogger)) {
    if (typeof value !== 'function') {
      continue
    }

    // This line breaks the app as of Next 13.4.19
    // eslint-disable-next-line security/detect-object-injection
    nextBuiltInLogger[property] = getLoggingFunction(property)
  }

  /**
   * Monkey-patch global console.log logger. Yes. Sigh.
   * @type {Array<keyof typeof console>}
   */
  const loggingProperties = ['log', 'debug', 'info', 'warn', 'error']
  for (const property of loggingProperties) {
    // property is coming from loggingProperties which is a hard coded array
    // allowing console here since it is adding to the functionality of server side logs
    // eslint-disable-next-line no-console, security/detect-object-injection
    console[property] = getLoggingFunction(property)
  }

  // Add general error logging.
  process.on('unhandledRejection', (error, promise) => {
    logger.error(
      {
        type: 'unhandledRejection',
        error: cleanObjectForSerialization(error),
        data: { promise: cleanObjectForSerialization(promise) },
      },
      `${error}`
    )
  })

  process.on('uncaughtException', (error) => {
    logger.error(
      { type: 'uncaughtException', error: cleanObjectForSerialization(error) },
      `${error}`
    )
  })
}

function cleanObjectForSerialization(value) {
  // Clean up or copy `value` so our logger or error reporting system
  // can record it.
  //
  // Because our logger `pino` uses JSON.stringify, we need to do
  // the following here:
  //
  // 1. Remove all cycles. JSON.stringify throws an error when you pass
  //    a value with cyclical references.
  //    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
  // #NOTE: Pino does not throw errors when you pass a cyclical reference, but handles it by adding
  // [Circular] to the output.

  // #TODO We may want this for cleaner Error logs.
  // 2. Because JSON.stringify only serializes enumerable properties, we
  //    need to copy interesting, but non-enumerable properties like
  //    value.name and value.message for errors:
  //    JSON.stringify(new Error('nothing serialized')) returns '{}'
  //

  return value
}

module.exports.initLogger = setUpLogging
