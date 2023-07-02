// fetch para trazer varios dados de uma vez e o get para trazer um dado especifico
import { CheckIn } from '@prisma/client'
import { ICheckInRepository } from '@/repositories/ICheck-in-repository'

interface FetchUserCheckInHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryUseCase {
  constructor(private readonly checkInRepository: ICheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)
    return {
      checkIns,
    }
  }
}
