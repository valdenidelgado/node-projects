import { PrismaGymRepository } from '@/repositories/prisma/gyms-repository'
import { CreateGymUseCase } from '../create-gym/create-gym-usecase'

export function makeCreateGymUseCase() {
  const prismaGymRepository = new PrismaGymRepository()
  const createGymUseCase = new CreateGymUseCase(prismaGymRepository)
  return createGymUseCase
}
