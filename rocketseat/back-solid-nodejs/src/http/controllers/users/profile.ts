import { makeGetUserProfileUseCase } from '@/usecases/factories/make-get-userprofile-usecase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
