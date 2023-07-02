import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { GetUserProfileUseCase } from '../get-user-profile/get-user-profile-usecase'

export function makeGetUserProfileUseCase() {
  const repository = new PrismaUsersRepository()
  const usecase = new GetUserProfileUseCase(repository)
  return usecase
}
