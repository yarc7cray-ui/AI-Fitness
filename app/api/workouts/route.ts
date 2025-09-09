import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import { WorkoutSessionSchema } from '@/lib/validators'
import { isRateLimited } from '@/lib/rate-limit'

export async function GET(req: Request) {
  const cookieStore = cookies()
  const device = cookieStore.get('deviceId')?.value
  if (!device) return NextResponse.json({ error: 'deviceId cookie missing' }, { status: 401 })

  const url = new URL(req.url)
  const from = url.searchParams.get('from')
  const to = url.searchParams.get('to')

  const where: any = { ownerKey: device }
  if (from || to) {
    where.date = {}
    if (from) where.date.gte = new Date(from)
    if (to) where.date.lte = new Date(to)
  }

  const items = await prisma.workoutSession.findMany({ where, orderBy: { date: 'desc' }, take: 200 })
  return NextResponse.json({ workouts: items })
}

export async function POST(req: Request) {
  const cookieStore = cookies()
  const device = cookieStore.get('deviceId')?.value
  if (!device) return NextResponse.json({ error: 'deviceId cookie missing' }, { status: 401 })

  if (await isRateLimited(`workout:${device}`)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 })

  const body = await req.json()
  const parsed = WorkoutSessionSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

  const payload = parsed.data
  if (payload.id) {
    const updated = await prisma.workoutSession.upsert({
      where: { id: payload.id },
      update: { ...payload, ownerKey: device, date: payload.date ? new Date(payload.date) : undefined },
      create: { ...payload, ownerKey: device, date: payload.date ? new Date(payload.date) : undefined },
    })
    return NextResponse.json({ workout: updated })
  }

  const created = await prisma.workoutSession.create({ data: { ...payload, ownerKey: device, date: payload.date ? new Date(payload.date) : undefined } })
  return NextResponse.json({ workout: created })
}

export async function PUT(req: Request) {
  const cookieStore = cookies()
  const device = cookieStore.get('deviceId')?.value
  if (!device) return NextResponse.json({ error: 'deviceId cookie missing' }, { status: 401 })

  const body = await req.json()
  const parsed = WorkoutSessionSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

  const payload = parsed.data
  if (!payload.id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const updated = await prisma.workoutSession.update({ where: { id: payload.id }, data: { ...payload, ownerKey: device, date: payload.date ? new Date(payload.date) : undefined } })
  return NextResponse.json({ workout: updated })
}

export async function DELETE(req: Request) {
  const cookieStore = cookies()
  const device = cookieStore.get('deviceId')?.value
  if (!device) return NextResponse.json({ error: 'deviceId cookie missing' }, { status: 401 })

  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  await prisma.workoutSession.deleteMany({ where: { id, ownerKey: device } })
  return NextResponse.json({ ok: true })
}
