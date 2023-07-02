import { PrismaCheckInRepository } from '@/repositories/prisma/check-in-repository'
import { ValidateCheckInUseCase } from '../validate-checkin/validate-checkin-usecase'

export function makeValidateCheckInUseCase() {
  const repository = new PrismaCheckInRepository()
  const usecase = new ValidateCheckInUseCase(repository)
  return usecase
}
