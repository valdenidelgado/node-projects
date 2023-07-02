const AuthUseCase = require('./auth-usecase');
const {MissingParamError, InvalidParamError} = require("../../utils/errors")

const makeLoadUserByEmailRepository = () => {
    class LoadUserByEmailRepositorySpy {
        async load(email) {
            this.email = email;
            return this.user;
        }
    }
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
    loadUserByEmailRepositorySpy.user = {
        id: 'any_id',
        password: 'hashed_password'
    }
    return loadUserByEmailRepositorySpy;
}

const makeUpdateAccessTokenRepository = () => {
    class UpdateAccessTokenRepositorySpy {
        async update(userId, accessToken) {
            this.userId = userId;
            this.accessToken = accessToken;
        }
    }
    return new UpdateAccessTokenRepositorySpy();
}
const makeEncrypter = () => {
    class EncrypterSpy {
        async compare(password, hashedPassword) {
            this.password = password;
            this.hashedPassword = hashedPassword;
            return this.isValid;
        }
    }
    const encrypterSpy = new EncrypterSpy();
    encrypterSpy.isValid = true;
    return encrypterSpy;
}

const makeTokenGenerator = () => {
    class TokenGeneratorSpy {
        async generate(userId) {
            this.id = userId;
            return this.accessToken;
        }
    }
    const tokenGeneratorSpy = new TokenGeneratorSpy();
    tokenGeneratorSpy.accessToken = 'any_token';
    return tokenGeneratorSpy;
}

const makeSut = () => {
    const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository();
    const encrypterSpy = makeEncrypter()
    const tokenGeneratorSpy = makeTokenGenerator();
    const updateAccessTokenRepositorySpy = makeUpdateAccessTokenRepository();

    const sut = new AuthUseCase({
        loadUserByEmailRepository: loadUserByEmailRepositorySpy,
        encrypter: encrypterSpy,
        tokenGenerator: tokenGeneratorSpy,
        updateAccessTokenRepository: updateAccessTokenRepositorySpy
    });
    return {
        sut,
        loadUserByEmailRepositorySpy,
        encrypterSpy,
        tokenGeneratorSpy,
        updateAccessTokenRepositorySpy
    }
}

const makeLoadUserByEmailRepositoryWithError = () => {
    class LoadUserByEmailRepositorySpy {
        async load(email) {
            throw new Error();
        }
    }
    return new LoadUserByEmailRepositorySpy();
}

describe('Auth UseCase', function () {
    it('should throw if no email is provided',  () => {
        const { sut } = makeSut();
        const promise = sut.auth();
        expect(promise).rejects.toThrow(new MissingParamError('email'));
    });

    it('should throw if no password is provided', () => {
        const { sut } = makeSut();
        const promise =  sut.auth('any_email@mail.com');
        expect(promise).rejects.toThrow(new MissingParamError('password'));
    });

    it('should call LoadUserByEmailRepository with correct email', async () => {
        const { sut, loadUserByEmailRepositorySpy } = makeSut();
        await sut.auth('any_email@mail.com', 'any_password');
        expect(loadUserByEmailRepositorySpy.email).toBe('any_email@mail.com');
    });

    it('should throw if no dependency is provided', () => {
        const sut = new AuthUseCase();
        const promise = sut.auth('any_email@mail.com', 'any_password');
        expect(promise).rejects.toThrow();
    });

    it('should throw if no LoadUserByEmailRepository is provided', () => {
        const sut = new AuthUseCase({});
        const promise = sut.auth('any_email@mail.com', 'any_password');
        expect(promise).rejects.toThrow();
    });

    it('should throw if no LoadUserByEmailRepository has no load method', () => {
        const sut = new AuthUseCase({loadUserByEmailRepository: {}});
        const promise = sut.auth('any_email@mail.com', 'any_password');
        expect(promise).rejects.toThrow();
    });

    it('should return null if an invalid email is provided', async () => {
        const { sut, loadUserByEmailRepositorySpy } = makeSut();
        loadUserByEmailRepositorySpy.user = null;
        const accessToken = await sut.auth('invalid_email@mail.com', 'any_password');
        expect(accessToken).toBeNull();
    });

    it('should return null if an invalid password is provided', async () => {
        const { sut, encrypterSpy } = makeSut();
        encrypterSpy.isValid = false;
        const accessToken = await sut.auth('valid_email@mail.com', 'any_password');
        expect(accessToken).toBeNull();
    });

    it('should call Encrypter with correct values', async () => {
        const { sut, loadUserByEmailRepositorySpy, encrypterSpy } = makeSut();
        await sut.auth('valid_email@mail.com', 'any_password');
        expect(encrypterSpy.password).toBe('any_password');
        expect(encrypterSpy.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password);
    });

    it('should call TokenGenerator with correct userId', async () => {
        const { sut, tokenGeneratorSpy, loadUserByEmailRepositorySpy } = makeSut();
        await sut.auth('valid_email@mail.com', 'valid_password');
        expect(tokenGeneratorSpy.id).toBe(loadUserByEmailRepositorySpy.user.id);
    });

    it('should return an accessToken if correct credentials are provided', async () => {
        const { sut, tokenGeneratorSpy } = makeSut();
        const accessToken = await sut.auth('valid_email@mail.com', 'valid_password');
        expect(accessToken).toBe(tokenGeneratorSpy.accessToken)
        expect(accessToken).toBeTruthy();
    });

    it('should call updateAccessTokenRepository with correct values', async () => {
        const { sut, loadUserByEmailRepositorySpy, tokenGeneratorSpy, updateAccessTokenRepositorySpy } = makeSut();
        await sut.auth('valid_email@mail.com', 'valid_password');
        expect(updateAccessTokenRepositorySpy.userId).toBe(loadUserByEmailRepositorySpy.user.id);
        expect(updateAccessTokenRepositorySpy.accessToken).toBe(tokenGeneratorSpy.accessToken);
    });

    // need make this for all dependencies injected
    it('should throw if LoadUserByEmailRepository throws', () => {
        const sut = new AuthUseCase({loadUserByEmailRepository: makeLoadUserByEmailRepositoryWithError});
        const promise = sut.auth('any_email@mail.com', 'any_password');
        expect(promise).rejects.toThrow();
    });
});