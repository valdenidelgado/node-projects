import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
})

export default model('User', UserSchema)
