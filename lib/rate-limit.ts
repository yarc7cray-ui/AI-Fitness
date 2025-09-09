const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

import prisma from '@/lib/prisma'

export async function isRateLimited(key: string, limit = 120, windowSeconds = 60) {
  // If Upstash configured, prefer it
  if (UPSTASH_URL && UPSTASH_TOKEN) {
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
      console.error('rate-limit error (upstash)', err)
      // fallthrough to DB fallback
    }
  }

  // DB-backed fallback using Prisma RateLimit table
  try {
    const now = new Date()
    const rec = await prisma.rateLimit.findUnique({ where: { key } })
    if (!rec) {
      const expiresAt = new Date(Date.now() + windowSeconds * 1000)
      await prisma.rateLimit.create({ data: { key, count: 1, expiresAt } })
      return false
    }

    if (rec.expiresAt && rec.expiresAt.getTime() < now.getTime()) {
      // expired, reset
      const expiresAt = new Date(Date.now() + windowSeconds * 1000)
      await prisma.rateLimit.update({ where: { key }, data: { count: 1, expiresAt } })
      return false
    }

    const newCount = rec.count + 1
    await prisma.rateLimit.update({ where: { key }, data: { count: newCount } })
    return newCount > limit
  } catch (err) {
    console.error('rate-limit error (db)', err)
    return false
  }
}
