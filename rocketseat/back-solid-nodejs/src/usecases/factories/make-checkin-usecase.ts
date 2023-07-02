import { PrismaCheckInRepository } from '@/repositories/prisma/check-in-repository'
import { PrismaGymRepository } from '@/repositories/prisma/gyms-repository'
import { CheckInUseCase } from '../check-in/checkins-use-case'

export function makeCheckInUseCase() {
  const prismaCheckInRepository = new PrismaCheckInRepository()
  const prismaGymRepository = new PrismaGymRepository()
  const checkInUseCase = new CheckInUseCase(
    prismaCheckInRepository,
    prismaGymRepository,
  )

  return checkInUseCase
}
