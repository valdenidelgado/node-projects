const LoginRouter = require('../../presentation/routers/login-router')
const AuthUseCase = require('../../domain/usecases/auth-use-case')
const EmailValidator = require('../../utils/helpers/email-validator')
const LoadUserByEmailRepository = require('../../infra/repositories/load-user-by-email-repository')
const UpdateAccessTokenRepository = require('../../infra/repositories/update-access-token-repository')
const Encrypter = require('../../utils/encrypter/encrypter')
const TokenGenerator = require('../../utils/token-generation/token-generator')
const env = require('../config/env')

module.exports = async (req, res) => {
    const loginRouter = new LoginRouter(
        new AuthUseCase(
            new LoadUserByEmailRepository(),
            new UpdateAccessTokenRepository(),
            new Encrypter(),
            new TokenGenerator(env.tokenSecret)
        ),
        new EmailValidator()
    )
    const httpRequest = {
        body: req.body
    }
    const httpResponse = await loginRouter.route(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
}