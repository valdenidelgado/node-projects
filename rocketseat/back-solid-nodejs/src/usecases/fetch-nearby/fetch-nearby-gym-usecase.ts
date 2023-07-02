import { Gym } from '@prisma/client'
import { IGymsRepository } from '@/repositories/IGyms-repository'

interface FetchNearByGymUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearByGymUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearByGymUseCase {
  constructor(private gymRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByGymUseCaseRequest): Promise<FetchNearByGymUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
