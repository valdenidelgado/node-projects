import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym-usecase'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })
  it('should be able create gym', async () => {
    const { gym } = await sut.execute({
      title: 'gym-title',
      description: null,
      latitude: -27.222633,
      longitude: -49.6455874,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
