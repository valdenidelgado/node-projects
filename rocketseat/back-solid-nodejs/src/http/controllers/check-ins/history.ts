import { makeFetchMemberCheckInHistoryUseCase } from '@/usecases/factories/make-fetch-member-checkin-history-usecase'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })
  const { page } = checkInHistoryQuerySchema.parse(request.query)
  const checkInHistoryUseCase = makeFetchMemberCheckInHistoryUseCase()
  const { checkIns } = await checkInHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })

  reply.status(200).send({
    checkIns,
  })
}
