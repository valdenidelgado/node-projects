module.exports = {
    isEmailValid: true,
    email: 'any_email@mail.com',
    isEmail(email) {
        this.email = email;
        return this.isEmailValid;
    }
}

// para teste de integração esse mock quebra o teste