import mongoose from "mongoose"

const connectionDB=async ()=>{

    try {
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("database connected");
        
    } catch (error) {
        console.log("getting error while connecting database", error);
        
        
    }
}
export default  connectionDB;