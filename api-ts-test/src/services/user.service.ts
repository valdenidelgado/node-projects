import userModel from '../model/user.model'

interface propsUser {
  name: string
  email: string
  password: string
  role: string
}

export default class UserService {
  static async create({ name, email, password, role }: propsUser) {
    const user = await userModel.create({ name, email, password, role })
    return user
  }

  static async findAll() {
    const users = await userModel.find()
    return users
  }
}
