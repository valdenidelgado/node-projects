import { IUser } from '../models/user';
export type MongoUser = Omit<IUser, "id"> 