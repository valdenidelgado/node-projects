import mongoose from 'mongoose'

mongoose.set('strictQuery', true)

const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/')
  } catch (error) {
    console.log('error', error)
  }
}

export default connect
