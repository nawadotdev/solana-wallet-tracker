import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error('MONGO_URI must be defined')
}

export const connectDB = async () : Promise<void> => {

    await mongoose.connect(MONGO_URI)

}