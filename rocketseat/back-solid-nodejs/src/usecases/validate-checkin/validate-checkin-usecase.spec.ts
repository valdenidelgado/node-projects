import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { ValidateCheckInUseCase } from './validate-checkin-usecase'
import { ResourceNotFoundError } from '../erros/resource-not-found-error'
import { LateCheckInValidationError } from '../erros/late-checkin-validation-error'

let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check in', async () => {
    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-id',
      user_id: 'user-id',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check in', async () => {
    const promise = sut.execute({
      checkInId: 'inexistent-check-in-id',
    })

    expect(promise).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-id',
      user_id: 'user-id',
    })

    const twentyOneMinutesMs = 21 * 60 * 1000
    vi.advanceTimersByTime(twentyOneMinutesMs)

    const promise = sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(promise).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
