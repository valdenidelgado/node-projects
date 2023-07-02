import { compare } from "bcrypt";
import { prisma } from "../../../database/prismaClient";
import { sign } from "jsonwebtoken";


interface IAuthenticateUserRequest {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateUserRequest) {


    const client = await prisma.clients.findFirst({
      where: {
        username,
      }
    })

    if (!client) {
      throw new Error("Incorrect email/password combination.");
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Incorrect email/password combination.");
    }

    const token = sign({username}, 'secret', {
      subject: client.id,
      expiresIn: "1d"
    })

    return token
  }
}
