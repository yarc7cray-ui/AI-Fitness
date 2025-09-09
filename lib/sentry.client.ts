export function initSentryClient() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN
  if (!dsn) return
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Sentry = require('@sentry/react')
    Sentry.init({ dsn, tracesSampleRate: 0.05 })
  } catch (e) {
    // ignore if package not installed
  }
}

export default initSentryClient
