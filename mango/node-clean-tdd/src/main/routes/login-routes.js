const loginRoute = require('../composers/login-routes-composer')
const ExpressRouterAdapter = require('../adapters/express-router-adapter')
module.exports = route => {
    route.post('/login', ExpressRouterAdapter.adapt(loginRoute)
}