import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface IRequest {
  username: string
  password: string
}


export class CreateDeliverymanUseCase {
  async execute({ username, password }: IRequest) {
    const deliverymanAlreadyExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: "insensitive",
        }
      },
    });

    if (deliverymanAlreadyExists) {
      throw new Error('Deliveryman already exists');
    }

    const passwordHash = await hash(password, 8);

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: passwordHash,
      },
    });

    return deliveryman;
  }
}