import { Request, Response } from 'express'
import UserService from '../services/user.service'

export default class UserController {
  static async create(req: Request, res: Response) {
    const { name, email, password, role } = req.body
    const user = await UserService.create({ name, email, password, role })
    res.status(201).json(user)
  }

  static async findAll(req: Request, res: Response) {
    const users = await UserService.findAll()
    res.status(200).json(users)
  }
}
