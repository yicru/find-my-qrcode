import { prisma } from '@/server/lib/prisma'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono().basePath('/api')

const route = app
  .get('/qrcodes', async (c) => {
    return c.jsonT({
      data: await prisma.qrcode.findMany(),
    })
  })
  .post(
    '/qrcodes',
    zValidator(
      'json',
      z.object({
        name: z.string().min(1),
      }),
    ),
    async (c) => {
      const data = c.req.valid('json')
      return c.jsonT({
        data: await prisma.qrcode.create({
          data: {
            name: data.name,
          },
        }),
      })
    },
  )
  .post(
    '/qrcodes/:id/find',
    zValidator(
      'param',
      z.object({
        id: z.string().min(1),
      }),
    ),
    zValidator(
      'json',
      z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
    ),
    async (c) => {
      const param = c.req.valid('param')
      const json = c.req.valid('json')

      return c.jsonT({
        data: await prisma.findLocation.create({
          data: {
            latitude: json.latitude,
            longitude: json.longitude,
            qrcode: {
              connect: { id: param.id },
            },
          },
        }),
      })
    },
  )
  .get('/find-locations', async (c) => {
    return c.jsonT({
      data: await prisma.findLocation.findMany(),
    })
  })

const fetch = app.fetch

export { fetch as GET, fetch as POST }

export type AppType = typeof route
