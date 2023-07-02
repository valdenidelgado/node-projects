import { makeGetUserMetrics } from '@/usecases/factories/make-get-user-metrics-usecase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const metricsUseCase = makeGetUserMetrics()
  const { checkInsCount } = await metricsUseCase.execute({
    userId: request.user.sub,
  })

  reply.status(200).send({
    checkInsCount,
  })
}
