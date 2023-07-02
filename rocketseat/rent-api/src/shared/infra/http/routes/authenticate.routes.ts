import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateUserController = new AuthenticateUserController();

const autenticateRouter = Router();

autenticateRouter.post("/session", authenticateUserController.handle);

export { autenticateRouter };
