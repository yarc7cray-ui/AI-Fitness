import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import { ProfileCreateSchema } from '@/lib/validators'

export async function GET() {
  const cookieStore = cookies()
  const device = cookieStore.get('deviceId')?.value
  if (!device) return NextResponse.json({ error: 'deviceId cookie missing' }, { status: 401 })

  let profile = await prisma.guestProfile.findUnique({ where: { ownerKey: device } })
  if (!profile) {
    profile = await prisma.guestProfile.create({ data: { ownerKey: device } })
  }
  return NextResponse.json({ profile })
}

export async function POST(req: Request) {
  const cookieStore = cookies()
  const device = cookieStore.get('deviceId')?.value
  if (!device) return NextResponse.json({ error: 'deviceId cookie missing' }, { status: 401 })

  const body = await req.json()
  const parsed = ProfileCreateSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 400 })

  const data = parsed.data
  const updated = await prisma.guestProfile.upsert({
    where: { ownerKey: device },
    update: { ...data, migrated: true },
    create: { ownerKey: device, ...data, migrated: true },
  })

  return NextResponse.json({ profile: updated })
}
