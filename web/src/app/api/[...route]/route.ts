import { Hono } from 'hono'

const app = new Hono().basePath('/api')

const route = app.get('/hello', (c) => {
  return c.jsonT({
    message: 'Hello Next.js!',
  })
})

const fetch = app.fetch

export { fetch as GET, fetch as POST }

export type AppType = typeof route
