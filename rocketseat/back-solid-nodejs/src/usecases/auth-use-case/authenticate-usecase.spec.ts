import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate-usecase'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../erros/invalid-credentials-error'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able authenticate', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'john@doe.com',
      password: '123456',
    })

    expect(user).toBeDefined()
  })

  it('should not be able authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'john@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'john@doe.com',
        password: '1233356',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
