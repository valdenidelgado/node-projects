import { Gym } from '@prisma/client'
import { IGymsRepository } from '@/repositories/IGyms-repository'

interface IGymProps {
  title: string
  description: string | null
  latitude: number
  longitude: number
}

interface IResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepository: IGymsRepository) {}

  async execute({
    title,
    description,
    latitude,
    longitude,
  }: IGymProps): Promise<IResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
