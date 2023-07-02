import { makeFetchNearbyGymUseCase } from '@/usecases/factories/make-fetch-nearby-gym-usecase'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)
  const nearbyGymUseCase = makeFetchNearbyGymUseCase()
  const { gyms } = await nearbyGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  reply.status(200).send({
    gyms,
  })
}
