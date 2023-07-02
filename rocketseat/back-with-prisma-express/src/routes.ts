import { Router } from 'express'
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController'
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController'
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController'

const routes = Router()

const createClienteController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const createDeliverymanController = new CreateDeliverymanController()

routes.post('/client/authenticate', authenticateClientController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)
routes.post('/clients/',  createClienteController.handle)
routes.post('/deliveryman/',  createDeliverymanController.handle)

export { routes }