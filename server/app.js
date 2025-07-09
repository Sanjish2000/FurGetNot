import express from "express"
import dotenv from "dotenv"
import connectionDB from "./db/connectionDB.js"
import userRouter from "./routers/user.js"
import petRouter from "./routers/pet.js"
import reminderRoute from  "./routers/reminder.js"
import authRoutes from "./routers/authRoutes.js";
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()
dotenv.config()
connectionDB();
app.use(express.json())
// app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/uploads', express.static('uploads'));

app.use(cors({
    origin:"https://furgetnot.onrender.com",
    credentials: true,   
}))

//user Router
app.use("/api/user",userRouter)  



// pet Router 
app.use("/api/pets",petRouter)



// reminder route 
app.use("/api/reminder",reminderRoute)

// Google Auht
app.use("/api/auth", authRoutes);


const port = process.env.PORT||3000
 app.listen(port,()=>{
    console.log(`runing at ${port}`);
    
 })