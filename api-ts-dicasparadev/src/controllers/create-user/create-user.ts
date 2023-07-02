import validator from "validator";
import { IUser } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { badRequest, created, serverError } from "../helpers";
import { ICreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<ICreateUserParams>
  ): Promise<HttpResponse<IUser | string>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof ICreateUserParams]?.length) {
          return badRequest(`Fields ${field} is required`);
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("Invalid email");
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return created<IUser>(user);
    } catch (error) {
      return serverError();
    }
  }
}
