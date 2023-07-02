import express from 'express'
import connect from './db/db'
import route from './routes/user.route'

const app = express()

app.use(express.json())
app.use('/user', route)
connect()

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
