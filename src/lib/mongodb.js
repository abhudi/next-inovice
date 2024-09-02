import mongoose from "mongoose"

export const connectMongoDB = async () =>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    return true
  }
  catch(error){
    console.log("connection error" , error);
    process.exit(1)
  }
}