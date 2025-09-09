const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

export async function isRateLimited(key: string, limit = 120, windowSeconds = 60) {
  // If Upstash not configured, no-op
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return false

  const redisKey = `rl:${key}`
  try {
    const res = await fetch(`${UPSTASH_URL}/increment/${encodeURIComponent(redisKey)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ by: 1 }),
    })
    const json = await res.json()
    const value = json.result ?? 0
    if (value === 1) {
      // set expiry
      await fetch(`${UPSTASH_URL}/expire/${encodeURIComponent(redisKey)}/${windowSeconds}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
      })
    }
    return value > limit
  } catch (err) {
    // fail open on rate limit errors
    console.error('rate-limit error', err)
    return false
  }
}
