import { makeCreateGymUseCase } from '@/usecases/factories/make-create-gym-usecase'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
  const { title, description, latitude, longitude } = createGymBodySchema.parse(
    request.body,
  )
  const createUseCase = makeCreateGymUseCase()
  await createUseCase.execute({ title, description, latitude, longitude })

  reply.status(201).send()
}
