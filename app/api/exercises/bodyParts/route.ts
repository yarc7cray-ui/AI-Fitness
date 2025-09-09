import { NextResponse } from 'next/server'
import { listBodyParts } from '@/lib/exercise-api'
import { isRateLimited } from '@/lib/rate-limit'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = cookies()
  const device = cookieStore.get('deviceId')?.value ?? 'anon'
  if (await isRateLimited(`exercises:bodyParts:${device}`, 60, 60)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  try {
    const data = await listBodyParts()
    return NextResponse.json({ bodyParts: data })
  } catch (e) {
    return NextResponse.json({ error: 'external_api_error' }, { status: 502 })
  }
}
