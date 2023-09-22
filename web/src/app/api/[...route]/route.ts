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
        emoji: z.string(),
        name: z.string().min(1),
      }),
    ),
    async (c) => {
      const json = c.req.valid('json')
      return c.jsonT({
        data: await prisma.qrcode.create({
          data: {
            emoji: json.emoji,
            name: json.name,
          },
          include: {
            FindLocation: {
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        }),
      })
    },
  )
  .delete(
    '/qrcodes/:id',
    zValidator(
      'param',
      z.object({
        id: z.string().min(1),
      }),
    ),
    async (c) => {
      const param = c.req.valid('param')

      return c.jsonT({
        data: await prisma.qrcode.delete({
          where: {
            id: param.id,
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
      data: await prisma.findLocation.findMany({
        include: {
          qrcode: true,
        },
      }),
    })
  })

const fetch = app.fetch

export { fetch as GET, fetch as PUT, fetch as POST, fetch as DELETE }

export type AppType = typeof route
