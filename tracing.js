/* eslint-disable @typescript-eslint/no-var-requires */
// OTEL tracing

const process = require('process')
const opentelemetry = require('@opentelemetry/sdk-node')
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node')
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base')
const { Resource } = require('@opentelemetry/resources')
const {
  SemanticResourceAttributes,
} = require('@opentelemetry/semantic-conventions')

const traceExporter = new ConsoleSpanExporter()

const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'ussf-portal-client',
  }),
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
})

sdk
  .start()
  .then(() => console.log('Tracing initialized'))
  .catch((error) => console.log('Error initializing tracing', error))

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0))
})
