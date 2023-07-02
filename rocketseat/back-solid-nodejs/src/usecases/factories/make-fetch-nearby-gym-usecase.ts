import { PrismaGymRepository } from '@/repositories/prisma/gyms-repository'
import { FetchNearByGymUseCase } from '../fetch-nearby/fetch-nearby-gym-usecase'

export function makeFetchNearbyGymUseCase() {
  const repository = new PrismaGymRepository()
  const usecase = new FetchNearByGymUseCase(repository)
  return usecase
}
