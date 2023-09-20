import { prisma } from '@/server/lib/prisma'
import { Hono } from 'hono'

const app = new Hono().basePath('/api')

const route = app.get('/qrcodes', async (c) => {
  return c.jsonT({
    data: await prisma.qrcode.findMany(),
  })
})

const fetch = app.fetch

export { fetch as GET, fetch as POST }

export type AppType = typeof route
