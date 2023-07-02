import { compare } from "bcrypt";
import { prisma } from "../../../database/prismaClient";
import { sign } from "jsonwebtoken";


interface IAuthenticateDeliverymanRequest {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliverymanRequest) {


    const deliveryman = await prisma.clients.findFirst({
      where: {
        username,
      }
    })

    if (!deliveryman) {
      throw new Error("Incorrect email/password combination.");
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("Incorrect email/password combination.");
    }

    const token = sign({username}, 'secret77', {
      subject: deliveryman.id,
      expiresIn: "1d"
    })

    return token
  }
}
