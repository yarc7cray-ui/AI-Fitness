import { NextResponse } from 'next/server'
import { listExercisesByBodyPart } from '@/lib/exercise-api'
import { isRateLimited } from '@/lib/rate-limit'
import { cookies } from 'next/headers'
import { z } from 'zod'

const ParamSchema = z.object({ bodyPart: z.string().min(1) })

export async function GET(req: Request, { params }: { params: { bodyPart: string } }) {
  const parsed = ParamSchema.safeParse(params)
  if (!parsed.success) return NextResponse.json({ error: 'invalid_params' }, { status: 400 })

  const cookieStore = cookies()
  const device = cookieStore.get('deviceId')?.value ?? 'anon'
  if (await isRateLimited(`exercises:bodyPart:${device}`, 60, 60)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 })

  try {
    const data = await listExercisesByBodyPart(parsed.data.bodyPart)
    return NextResponse.json({ exercises: data })
  } catch (e) {
    return NextResponse.json({ error: 'external_api_error' }, { status: 502 })
  }
}
