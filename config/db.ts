import mongoose from "mongoose" 

const  dbConnect =  async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URL!)
       console.log("connect Mongodb sucessfully")
    } catch (error) {
        console.log("connect Faild")
        process.exit(1);
    }
}
export default dbConnect;