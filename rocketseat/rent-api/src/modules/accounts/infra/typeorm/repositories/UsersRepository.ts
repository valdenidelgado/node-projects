import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaClient) {}
  create(data: ICreateUserDTO): Promise<void> {
    const create = this.prisma.user.create(); //assim que acessa o entity do primes
    const save = this.prisma.save();
  }
}

export { UsersRepository };
