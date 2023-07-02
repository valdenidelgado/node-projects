import { Request, Response } from "express"
import { CreateClientUseCase } from "./CreateClientUseCase"

export class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const createClientUseCase = new CreateClientUseCase()

    try {
      const result = await createClientUseCase.execute({ username, password })
      return response.status(201).json({ result})
    } catch (error) {
      return response.status(400).json({ error: 'deu b.o' })
    }
  }
}