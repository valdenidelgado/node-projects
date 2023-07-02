import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {

  handle(request: Request, response: Response): Response {
    const { name, email, password, driver_licence } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    try {
      await createUserUseCase.execute({ name, email, password });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }

    return response.status(201).send();
  }
}

export { CreateUserController };