import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './seach-gyms-usecase'

let gymRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymRepository)
  })
  it('should be able to search for gyms', async () => {
    await gymRepository.create({
      title: 'gym-title-01',
      description: null,
      latitude: -27.222633,
      longitude: -49.6455874,
    })

    await gymRepository.create({
      title: 'gym-title-2',
      description: null,
      latitude: -27.222633,
      longitude: -49.6455874,
    })

    const { gyms } = await sut.execute({
      query: 'gym-title-01',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'gym-title-01' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `gym-title-${i}`,
        description: null,
        latitude: -27.222633,
        longitude: -49.6455874,
      })
    }

    const { gyms } = await sut.execute({
      query: 'gym-title',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'gym-title-21' }),
      expect.objectContaining({ title: 'gym-title-22' }),
    ])
  })
})
