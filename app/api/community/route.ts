import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import { CommunityPostSchema } from '@/lib/validators'
import { isRateLimited } from '@/lib/rate-limit'

export async function GET(req: Request) {
  const cookieStore = cookies()
  const device = cookieStore.get('deviceId')?.value
  if (!device) return NextResponse.json({ error: 'deviceId cookie missing' }, { status: 401 })

  const url = new URL(req.url)
  const limit = parseInt(url.searchParams.get('limit') || '50', 10)

  const items = await prisma.communityPost.findMany({ where: { ownerKey: device }, orderBy: { createdAt: 'desc' }, take: Math.min(limit, 200) })
  return NextResponse.json({ posts: items })
}

export async function POST(req: Request) {
  const cookieStore = cookies()
  const device = cookieStore.get('deviceId')?.value
  if (!device) return NextResponse.json({ error: 'deviceId cookie missing' }, { status: 401 })

  if (await isRateLimited(`post:${device}`)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 })

  const body = await req.json()
  const parsed = CommunityPostSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

  const payload = parsed.data
  if (payload.id) {
    const updated = await prisma.communityPost.upsert({
      where: { id: payload.id },
      update: { ...payload, ownerKey: device },
      create: { ...payload, ownerKey: device },
    })
    return NextResponse.json({ post: updated })
  }

  const created = await prisma.communityPost.create({ data: { ...payload, ownerKey: device } })
  return NextResponse.json({ post: created })
}

export async function PUT(req: Request) {
  const cookieStore = cookies()
  const device = cookieStore.get('deviceId')?.value
  if (!device) return NextResponse.json({ error: 'deviceId cookie missing' }, { status: 401 })

  const body = await req.json()
  const parsed = CommunityPostSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

  const payload = parsed.data
  if (!payload.id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const updated = await prisma.communityPost.update({ where: { id: payload.id }, data: { ...payload, ownerKey: device } })
  return NextResponse.json({ post: updated })
}

export async function DELETE(req: Request) {
  const cookieStore = cookies()
  const device = cookieStore.get('deviceId')?.value
  if (!device) return NextResponse.json({ error: 'deviceId cookie missing' }, { status: 401 })

  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  await prisma.communityPost.deleteMany({ where: { id, ownerKey: device } })
  return NextResponse.json({ ok: true })
}
