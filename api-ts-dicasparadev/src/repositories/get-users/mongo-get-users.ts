import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { IUser } from "../../models/user";
import { MongoClient } from "../../database/mongo";
import { MongoUser } from "../mongo-protocols";
export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<IUser[]> {
    const users = await MongoClient.db
      .collection<MongoUser>("users")
      .find()
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
