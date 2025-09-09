import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const cookieStore = cookies()
  const device = cookieStore.get('deviceId')?.value
  if (!device) return NextResponse.json({ error: 'deviceId cookie missing' }, { status: 401 })

  const body = await req.json()
  // expected shape: { profile?, workouts?, meals?, achievements?, posts? }
  const { profile, workouts, meals, achievements, posts } = body || {}

  // Upsert profile
  if (profile) {
    await prisma.guestProfile.upsert({
      where: { ownerKey: device },
      update: { ...profile, migrated: true },
      create: { ownerKey: device, ...profile, migrated: true },
    })
  }

  // Helper to upsert arrays by id when provided
  const upsertArray = async (items: any[], model: any) => {
    if (!Array.isArray(items)) return
    for (const item of items) {
      try {
        if (item.id) {
          await model.upsert({
            where: { id: item.id },
            update: { ...item, ownerKey: device },
            create: { ...item, ownerKey: device },
          })
        } else {
          await model.create({ data: { ...item, ownerKey: device } })
        }
      } catch (e) {
        // continue on error to make migration resilient
        console.error('migrate item error', e)
      }
    }
  }

  await upsertArray(workouts, prisma.workoutSession)
  await upsertArray(meals, prisma.mealLog)
  await upsertArray(achievements, prisma.achievement)
  await upsertArray(posts, prisma.communityPost)

  return NextResponse.json({ ok: true })
}
