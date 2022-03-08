/* eslint-disable @typescript-eslint/no-var-requires */
// OTEL tracing
const { BatchSpanProcessor } = require('@opentelemetry/tracing')
const { NodeTracerProvider } = require('@opentelemetry/node')
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc')
const { AWSXRayPropagator } = require('@opentelemetry/propagator-aws-xray')
const { AWSXRayIdGenerator } = require('@opentelemetry/id-generator-aws-xray')
const { trace } = require('@opentelemetry/api')
const { AwsInstrumentation } = require('@opentelemetry/instrumentation-aws-sdk')
// const { registerInstrumentations } = require('@opentelemetry/instrumentation')
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node')
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
    // Instrumentations can go here if needed
    instrumentations: [getNodeAutoInstrumentations()],
    // Resources can go here if needed
    resources: { resource },
  }

  const tracerProvider = new NodeTracerProvider(tracerConfig)

  // Add OTLP exporter
  const otlpExporter = new OTLPTraceExporter({
    serviceName,
    url: '127.0.0.1:4317',
    // credentials only required if tls setup on Collector instance,
    // credentials: grpc.credentials.createSsl(
    //   fs.readFileSync("./ca.crt"),
    //   fs.readFileSync("./client.key"),
    //   fs.readFileSync("./client.crt")
    // )
  })

  tracerProvider.addSpanProcessor(new BatchSpanProcessor(otlpExporter))

  // Register tracer provider with Xray propagator
  tracerProvider.register({
    propagator: new AWSXRayPropagator(),
  })

  // Return an tracer instance
  return trace.getTracer('portal-tracing-test')
}
