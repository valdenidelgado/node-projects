import { PrismaGymRepository } from '@/repositories/prisma/gyms-repository'
import { SearchGymUseCase } from '../seach-gyms/seach-gyms-usecase'

export function makeSearchGymsUseCase() {
  const repository = new PrismaGymRepository()
  const usecase = new SearchGymUseCase(repository)
  return usecase
}
