import fastify from 'fastify'
import cookie from '@fastify/cookie'
import database from './database'
import { transaction } from './routes/transactions'
const app = fastify()

database()
// prefix e similar ao app.use('/transactions', transaction)

app.register(cookie)
app.register(transaction, { prefix: '/transactions' })

export default app
