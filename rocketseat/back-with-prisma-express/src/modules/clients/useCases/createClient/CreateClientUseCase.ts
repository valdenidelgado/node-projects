import { hash } from 'bcrypt'
import { prisma } from '../../../../database/prismaClient'

interface ICreateClientDTO {
  username: string
  password: string
}


export class CreateClientUseCase {
  async execute({username, password}: ICreateClientDTO): Promise<void> {
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          mode: "insensitive",
        }
      }
    })

    if (clientExist) {
      throw new Error("Client already exists!")
    }

    const hashedPassword = await hash(password, 6)

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashedPassword
      }
    })

    return client
  }
}