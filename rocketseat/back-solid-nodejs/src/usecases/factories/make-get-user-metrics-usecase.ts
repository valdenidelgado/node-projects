import { GetUserMetricsUseCase } from '../user-metrics/get-user-metrics-usecase'
import { PrismaCheckInRepository } from '@/repositories/prisma/check-in-repository'

export function makeGetUserMetrics() {
  const repository = new PrismaCheckInRepository()
  const usecase = new GetUserMetricsUseCase(repository)
  return usecase
}
