import { Request, Response } from "express";
import { AuthenticateClientUseCase } from "./AuthenticateClientUseCase";

export class AuthenticateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUserUseCase = new AuthenticateClientUseCase()

    const token = await authenticateUserUseCase.execute({
      username,
      password,
    });

    return response.json(token);
  }
}