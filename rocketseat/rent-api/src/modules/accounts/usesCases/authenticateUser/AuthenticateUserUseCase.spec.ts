import { AppError } from "../../../../shared/errors/AppErrors";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUsersUseCase: CreateUserUseCase;
// let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    // usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    // dateProvider = new DayjsDateProvider();
    // hashProvider = new BCryptHashProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
      // usersTokensRepositoryInMemory,
      // dateProvider,
      // hashProvider
    );
    createUsersUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      username: "bla",
      driver_license: "000123",
      email: "email@gmail.com",
      password: "1234",
      name: "User Test",
    };

    await createUsersUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "test@gmail.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        username: "bla",
        driver_license: "9999",
        email: "test@gmail.com",
        password: "1234",
        name: "User Test Error",
      };

      await createUsersUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
