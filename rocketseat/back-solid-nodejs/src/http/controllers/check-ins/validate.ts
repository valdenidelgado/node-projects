import { makeValidateCheckInUseCase } from '@/usecases/factories/make-validate-checkin-usecase'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamSchema.parse(request.params)

  const validateUseCase = makeValidateCheckInUseCase()
  await validateUseCase.execute({
    checkInId,
  })

  reply.status(204).send()
}
