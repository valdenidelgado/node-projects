import { makeSearchGymsUseCase } from '@/usecases/factories/make-search-gyms-usecase'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })
  const { q, page } = searchGymsQuerySchema.parse(request.query)
  const searchUseCase = makeSearchGymsUseCase()
  const { gyms } = await searchUseCase.execute({
    query: q,
    page,
  })

  reply.status(200).send({
    gyms,
  })
}
