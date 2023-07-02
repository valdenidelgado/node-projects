module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    tokenSecret: process.env.SECRET || 'secret'
}