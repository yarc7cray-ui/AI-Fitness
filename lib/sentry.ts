export function initSentry() {
  const dsn = process.env.SENTRY_DSN
  if (!dsn) return
  try {
    // require lazily to avoid adding packages when not configured
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Sentry = require('@sentry/node')
    Sentry.init({ dsn, tracesSampleRate: 0.1 })
  } catch (e) {
    // ignore if package not installed
    // console.warn('Sentry not initialized', e)
  }
}

export default initSentry
