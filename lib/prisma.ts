import { PrismaClient } from '@prisma/client'
import initSentry from '@/lib/sentry'

// initialize Sentry early on server startup (optional)
initSentry()

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma
