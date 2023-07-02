import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { checkSessionIdExist } from '../middlewares/check-session-id-exists'

export async function transaction(app: FastifyInstance) {
  // para usar o middleware em todas as rotas
  // app.addHook('preHandler', checkSessionIdExist)
  app.get(
    '/',
    { preHandler: [checkSessionIdExist] },
    async (request, reply) => {
      const { sessionId } = request.cookies
      return { hello: 'world', sessionId }
    },
  )
  app.post('/', async (request, reply) => {
    const createUserSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
      age: z.number().min(18),
      role: z.enum(['admin', 'user']),
    })
    const user = createUserSchema.parse(request.body)
    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    return user
  })
  app.post('/:id', async (request) => {
    const createUserIdSchema = z.object({
      id: z.string().uuid(),
    })
    // ou posso buscar com { id }
    const userId = createUserIdSchema.parse(request.params)
    return userId
  })
}
