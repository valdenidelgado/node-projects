import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { RegisterUser } from '../register-use-case'

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  return new RegisterUser(prismaUsersRepository)
}
