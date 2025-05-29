import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=${process.env.MONGO_APP_NAME}`

export async function connectDb() {
  try {
    await mongoose.connect(mongoURI)
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error)
    process.exit(1)
  }
}

export { mongoose }
