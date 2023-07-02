import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearByGymUseCase } from './fetch-nearby-gym-usecase'

let gymRepository: InMemoryGymsRepository
let sut: FetchNearByGymUseCase

describe('Fetch near by Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymUseCase(gymRepository)
  })
  it('should be able to fetch nearby gyms', async () => {
    await gymRepository.create({
      title: 'near gym',
      description: null,
      latitude: -27.222633,
      longitude: -49.6455874,
    })

    await gymRepository.create({
      title: 'far gym',
      description: null,
      latitude: -27.767933,
      longitude: -49.9869874,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.222633,
      userLongitude: -49.6455874,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'near gym' })])
  })
})
