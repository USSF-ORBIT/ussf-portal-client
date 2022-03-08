import { NextApiRequest, NextApiResponse } from 'next'

import tracing from '../../../startup/tracing'

import { SpanKind, SpanStatusCode } from '@opentelemetry/api'

import api from '@opentelemetry/api'

// These values are defined by Webpack during the build step
declare const __VERSION__: string
declare const __BUILD_ID__: string
declare const __NODE_ENV__: string

function getTraceIdJson() {
  console.log('getTraceIdJson')
  const currentSpan = api.trace.getSpan(api.context.active())
  console.log(`traceid: ${currentSpan?.spanContext().traceId}`)
  const otelTraceId = currentSpan?.spanContext().traceId
  if (otelTraceId) {
    const timestamp = otelTraceId.substring(0, 8)
    const randomNumber = otelTraceId.substring(8)
    const xrayTraceId = '1-' + timestamp + '-' + randomNumber
    return JSON.stringify({ traceId: xrayTraceId })
  }
  return
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Responding to /sysinfo')
  const tracer = await tracing.initTracing()

  const span = tracer.startActiveSpan('handleRequest', (span) => {
    try {
      res.status(200).json({
        version: __VERSION__,
        buildId: __BUILD_ID__,
        nodeEnv: __NODE_ENV__,
        analyticsUrl: process.env.MATOMO_URL,
        analyticsSiteId: process.env.MATOMO_SITE_ID,
        traceId: getTraceIdJson(),
      })
      span.setStatus({ code: SpanStatusCode.OK })
    } catch (err) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: 'Test error',
      })
      throw err
    } finally {
      span.end()
    }
  })
}
