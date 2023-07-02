jest.mock('jsonwebtoken', () => ({
    token: 'any_id',
    sign(id, secret){
        this.id = id
        this.secret = secret
        return this.token
    }
}))


const jwt = require('jsonwebtoken')
const {MissingParamError} = require("../errors");
const TokenGenerator = require("./token-generator");

const makeSut = () => {
    return new TokenGenerator('secret')
}

describe('Token Generator', function () {
    it('should return null if jwt returns null', async () => {
        const sut = makeSut()
        jwt.token = null
        const token = await sut.generate('any_id')
        expect(token).toBeNull()
    });

    it('should return a token if a jwt returns token', async () => {
        const sut = makeSut()
        const token = await sut.generate('any_id')
        expect(token).toBe(jwt.token)
    });

    it('should call JWT with correct values', async () => {
        const sut = makeSut()
        await sut.generate('any_id')
        expect(jwt.id).toBe('any_id')
        expect(jwt.secret).toBe(sut.secret)
    });

    it('should throws if no secret is provided', async () => {
        const sut = new TokenGenerator()
        await expect(sut.generate('any_id')).rejects.toThrow(new MissingParamError('secret'))
    });

    it('should throws if no id is provided', async () => {
        const sut = makeSut()
        await expect(sut.generate()).rejects.toThrow(new MissingParamError('id'))
    });
});