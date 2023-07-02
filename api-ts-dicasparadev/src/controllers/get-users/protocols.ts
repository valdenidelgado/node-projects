import { IUser } from "../../models/user";

export interface IGetUsersRepository {
  getUsers(): Promise<IUser[]>;
}
