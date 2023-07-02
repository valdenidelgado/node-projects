import { Router } from 'express'
import UserController from '../controller/user.controller'

const route = Router()

route.get('/', UserController.findAll)
route.post('/create', UserController.create)

export default route
