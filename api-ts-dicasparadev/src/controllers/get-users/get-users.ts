import { IGetUsersRepository } from "./protocols";
import { HttpResponse, IController } from "../protocols";
import { ok, serverError } from "../helpers";
import { IUser } from "../../models/user";
export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}
  async handle(): Promise<HttpResponse<IUser[] | string>> {
    try {
      const users = await this.getUsersRepository.getUsers();

      return ok<IUser[]>(users);
    } catch (err) {
      return serverError();
    }
  }
}
