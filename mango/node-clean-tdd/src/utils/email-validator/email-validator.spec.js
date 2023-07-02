
const EmailValidator = require('./email-validator');
const validator = require('validator');
const {MissingParamError} = require("../errors");

const makeSut = () => {
    return new EmailValidator();
}

describe('Email validator', () => {
    it('should return true if validator returns true', function () {
        const sut = makeSut();
        const isEmailValid = sut.isValid('valid_email@mail.com');
        expect(isEmailValid).toBe(true);
    });

    it('should return false if validator returns false', function () {
        validator.isEmailValid = false;
        const sut = makeSut();
        const isEmailValid = sut.isValid('invalid_email@mail.com');
        expect(isEmailValid).toBe(false);
    });

    it('should call validator with correct email', function () {
        const sut = makeSut();
        sut.isValid('any_email@mail.com');
        expect(validator.email).toBe('any_email@mail.com');
    });

    it('should throw if no email are provided', () => {
        const sut = makeSut()
        expect(sut.isValid).toThrow(new MissingParamError('email'))
    });
});