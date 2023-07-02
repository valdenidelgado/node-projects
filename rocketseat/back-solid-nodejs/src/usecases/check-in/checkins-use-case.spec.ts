import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './checkins-use-case'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberCheckinError } from '../erros/max-number-checkin-error'
import { MaxDistanceError } from '../erros/max-distance-error'

let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymRepository)

    await gymRepository.create({
      id: 'gym-id',
      title: 'gym-title',
      description: '',
      latitude: -27.222633,
      longitude: -49.6455874,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -27.222633,
      userLongitude: -49.6455874,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)) // sempre ira ser criado nessa data 22/01/2022 08:00:00
    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -27.222633,
      userLongitude: -49.6455874,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -27.222633,
        userLongitude: -49.6455874,
      }),
    ).rejects.toBeInstanceOf(MaxNumberCheckinError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -27.222633,
      userLongitude: -49.6455874,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -27.222633,
      userLongitude: -49.6455874,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymRepository.items.push({
      id: 'gym-id-02',
      title: 'gym-title',
      description: 'gym-description',
      latitude: new Decimal(-27.5935),
      longitude: new Decimal(-48.5584),
    })
    const promise = sut.execute({
      gymId: 'gym-id-02',
      userId: 'user-id',
      userLatitude: -27.5935,
      userLongitude: -49.6455874,
    })

    expect(promise).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
