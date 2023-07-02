import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { AuthenticateUseCase } from '../auth-use-case/authenticate-usecase'

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)
  return authenticateUseCase
}
