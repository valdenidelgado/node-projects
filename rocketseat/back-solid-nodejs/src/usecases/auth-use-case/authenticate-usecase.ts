import { IUsersRepository } from '@/repositories/IUsers-repository'
import { InvalidCredentialsError } from '../erros/invalid-credentials-error'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private readonly userRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isValidPassword = await compare(password, user.password_hash)

    if (!isValidPassword) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
