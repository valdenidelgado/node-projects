jest.mock('bcrypt', () => ({
    isValid: true,
    async compare(value, hash) {
        this.value = value
        this.hash = hash
        return this.isValid
    }
}))


const bcrypt = require('bcrypt')
const Encrypter = require("./encrypter");
const {MissingParamError} = require("../errors");

const makeSut = () => {
    return sut = new Encrypter()
}
describe('Encrypter', function () {
    it('should return true if bcrypt returns true', async () => {
        const sut = makeSut()
        const isValid = await sut.compare('any_value', 'hashed_value')
        expect(isValid).toBe(true)
    });

    it('should return false if bcrypt returns false', async () => {
        const sut = makeSut()
        bcrypt.isValid = false
        const isValid = await sut.compare('any_value', 'hashed_value')
        expect(isValid).toBe(false)
    });

    it('should call bcrypt with correct values', async () => {
        const sut = makeSut()
        await sut.compare('any_value', 'hashed_value')
        expect(bcrypt.value).toBe('any_value')
        expect(bcrypt.hash).toBe('hashed_value')
    });

    it('should throw if no params are provided', () => {
        const sut = makeSut()
        expect(sut.compare()).rejects.toThrow(new MissingParamError('value'))
        expect(sut.compare('value')).rejects.toThrow(new MissingParamError('hash'))
    });
});