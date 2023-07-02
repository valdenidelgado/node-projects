const LoginRouter = require("./login-router");
const { UnauthorizedError, ServerError } = require("../errors");
const {MissingParamError} = require("../../utils/errors");

const makeSut = () => {
    const authUseCaseSpy = makeAuthUseCase();
    const emailValidatorSpy = makeEmailValidator();
    const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy);
    return {
        sut,
        authUseCaseSpy,
        emailValidatorSpy
    }
}

const makeEmailValidator = () => {
    class EmailValidatorSpy {
        isValid(email) {
            this.email = email;
            return this.isEmailValid;
        }
    }
    const emailValidatorSpy = new EmailValidatorSpy();
    emailValidatorSpy.isEmailValid = true;
    return emailValidatorSpy;
}

function makeEmailValidatorWithError() {
    class EmailValidatorSpy {
        isValid() {
            throw new Error()
        }
    }
    return new EmailValidatorSpy();
}

const makeAuthUseCase = () => {
    class AuthUseCaseSpy {
        auth(email, password) {
            this.email = email;
            this.password = password;
            return this.accessToken;
        }
    }
    const authUseCaseSpy =  new AuthUseCaseSpy();
    authUseCaseSpy.accessToken = 'valid_token';
    return authUseCaseSpy;
}

const makeAuthUseCaseWithError = () => {
    class AuthUseCaseSpy {
        auth() {
            throw new Error()
        }
    }
    return new AuthUseCaseSpy();
}

describe('Login router', function () {
    it('Should return 400 if no email is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                password: 'any_password'
            }
        };
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('email'));
    });

    it('Should return 400 if no password is provided', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                email: 'any_email@email.com'
            }
        };
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('password'));
    });

    it('should return 500 if no httpRequest is provided', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.route();
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });

    it('should return 500 if httpRequest has no body', async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.route({});
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });

    it('should call AuthUseCase with correct params', async () => {
        const { sut, authUseCaseSpy } = makeSut();
        const httpRequest = {
            body: {
                email: 'bla@bla.com',
                password: 'any_password'
            }
        }
        await sut.route(httpRequest);
        expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
        expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
    });

    it('should return 401 when invalid credentials are provided', async ()  => {
        const { sut, authUseCaseSpy } = makeSut();
        authUseCaseSpy.accessToken = null;
        const httpRequest = {
            body: {
                email: 'invalid@email.com',
                password: 'invalid_password'
            }
        }
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(401);
        expect(httpResponse.body).toEqual(new UnauthorizedError());
    });

    it('should return 500 if no AuthUseCase is provided', async () => {
        const sut = new LoginRouter();
        const httpRequest = {
            body: {
                email: 'any_email@email.com',
                password: 'any_password'
            }
        }
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });

    it('should return 500 if AuthUseCase has no auth method', async () => {
        const sut = new LoginRouter({});
        const httpRequest = {
            body: {
                email: 'any_email@email.com',
                password: 'any_password'
            }
        }
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });

    it('should return 200 when valid credentials are provided', async () => {
        const { sut, authUseCaseSpy } = makeSut();
        const httpRequest = {
            body: {
                email: 'valid@email.com',
                password: 'valid_password'
            }
        }
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(200);
        expect(httpResponse.body.accessToken).toEqual(authUseCaseSpy.accessToken);
    });

    it('should return 500 if AuthUseCase throws', async () => {

        const authUseCaseSpy = makeAuthUseCaseWithError();
        const sut = new LoginRouter(authUseCaseSpy);
        const httpRequest = {
            body: {
                email: 'any_email@email.com',
                password: 'any_password'
            }
        }
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
    });

    it('should return 400 if an invalid email is provided', async () => {
        const { sut, emailValidatorSpy } = makeSut();
        emailValidatorSpy.isEmailValid = false;
        const httpRequest = {
            body: {
                email: 'any_email@email.com',
                password: 'any_password'
            }
        }
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
    });

    it('should return 500 if no EmailValidator is provided', async () => {
        const authUseCaseSpy = makeAuthUseCase();
        const sut = new LoginRouter(authUseCaseSpy);
        const httpRequest = {
            body: {
                email: 'any_email@email.com',
                password: 'any_password'
            }
        }
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });

    it('should return 500 if EmailValidator has no isValid method', async () => {
        const authUseCaseSpy = makeAuthUseCase();
        const sut = new LoginRouter(authUseCaseSpy, {});
        const httpRequest = {
            body: {
                email: 'any_email@email.com',
                password: 'any_password'
            }
        }
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });

    it('should return 500 if EmailValidator throws', async () => {
        const authUseCaseSpy = makeAuthUseCase();
        const emailValidatorSpy = makeEmailValidatorWithError();
        const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy)
        const httpRequest = {
            body: {
                email: 'any_email@email.com',
                password: 'any_password'
            }
        }
        const httpResponse = await sut.route(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
    });

    it('should call EmailValidator with correct email', async () => {
        const { sut, emailValidatorSpy } = makeSut();
        const httpRequest = {
            body: {
                email: 'bla@bla.com',
                password: 'any_password'
            }
        }
        await sut.route(httpRequest);
        expect(emailValidatorSpy.email).toBe(httpRequest.body.email);
    });
});