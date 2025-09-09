import { NextResponse } from 'next/server'
import { getExerciseById } from '@/lib/exercise-api'
import { isRateLimited } from '@/lib/rate-limit'
import { cookies } from 'next/headers'
import { z } from 'zod'

const ParamSchema = z.object({ id: z.string().min(1) })

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const parsed = ParamSchema.safeParse(params)
  if (!parsed.success) return NextResponse.json({ error: 'invalid_params' }, { status: 400 })

  const cookieStore = cookies()
  const device = cookieStore.get('deviceId')?.value ?? 'anon'
  if (await isRateLimited(`exercises:id:${device}`, 60, 60)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 })

  try {
    const data = await getExerciseById(parsed.data.id)
    return NextResponse.json({ exercise: data })
  } catch (e) {
    return NextResponse.json({ error: 'external_api_error' }, { status: 502 })
  }
}
