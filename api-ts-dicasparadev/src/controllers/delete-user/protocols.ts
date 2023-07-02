import { IUser } from "../../models/user";

export interface IDeleteUserRepository {
  deleteUser(id: string): Promise<IUser>;
}
