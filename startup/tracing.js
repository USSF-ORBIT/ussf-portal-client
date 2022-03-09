/* eslint-disable @typescript-eslint/no-var-requires */
// OTEL tracing
const { BatchSpanProcessor } = require('@opentelemetry/tracing')
const { NodeTracerProvider } = require('@opentelemetry/node')
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc')
const { AWSXRayPropagator } = require('@opentelemetry/propagator-aws-xray')
const { AWSXRayIdGenerator } = require('@opentelemetry/id-generator-aws-xray')
const { trace } = require('@opentelemetry/api')

const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node')
const {
  getWebAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-web')
const { detectResources } = require('@opentelemetry/resources')
const {
  awsEcsDetector,
  awsEc2Detector,
} = require('@opentelemetry/resource-detector-aws')

module.exports.initTracing = async (serviceName) => {
  // Add detector for automatically recording metadata in ECS
  const resource = await detectResources({
    detectors: [awsEcsDetector, awsEc2Detector],
  })

  // Create a provider using the AWS ID Generator
  const tracerConfig = {
    idGenerator: new AWSXRayIdGenerator(),
    // Use Node and Web auto-instrumentations
    // https://github.com/open-telemetry/opentelemetry-js-contrib
    instrumentations: [
      getNodeAutoInstrumentations(),
      getWebAutoInstrumentations(),
    ],
    // Resources can go here if needed
    resources: { resource },
  }

  const tracerProvider = new NodeTracerProvider(tracerConfig)

  // Add OTLP exporter
  const otlpExporter = new OTLPTraceExporter({
    serviceName,
    url: '127.0.0.1:4317',
  })

  tracerProvider.addSpanProcessor(new BatchSpanProcessor(otlpExporter))

  // Register tracer provider with Xray propagator
  tracerProvider.register({
    propagator: new AWSXRayPropagator(),
  })

  // Return a tracer instance
  return trace.getTracer('ussf-portal-tracing')
}
