import { PrismaCheckInRepository } from '@/repositories/prisma/check-in-repository'
import { FetchUserCheckInHistoryUseCase } from '../fetch-member-checkin-history/fetch-member-checkin-history'

export function makeFetchMemberCheckInHistoryUseCase() {
  const repository = new PrismaCheckInRepository()
  const usecase = new FetchUserCheckInHistoryUseCase(repository)
  return usecase
}
