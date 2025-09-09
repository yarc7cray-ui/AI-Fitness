import { NextResponse } from 'next/server'
import { listTargetList, listEquipmentList } from '@/lib/exercise-api'
import { isRateLimited } from '@/lib/rate-limit'
import { cookies } from 'next/headers'

export async function GET(req: Request) {
  const cookieStore = cookies()
  const device = cookieStore.get('deviceId')?.value ?? 'anon'
  if (await isRateLimited(`exercises:lists:${device}`, 60, 60)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 })

  try {
    const targets = await listTargetList()
    const equipment = await listEquipmentList()
    return NextResponse.json({ targets, equipment })
  } catch (e) {
    return NextResponse.json({ error: 'external_api_error' }, { status: 502 })
  }
}
