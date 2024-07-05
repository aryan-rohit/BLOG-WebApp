import express from "express";
import cors from "cors"; // for cross origin resource sharing
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
// import cookieParser from "cookie-parser";


const app = express()
app.use(express.json())
app.use(cors())
// app.use(cookieParser())

app.get("/test",(req,res)=>{
    res.json("It works!!")
})

// index => routes => controllers

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)

app.listen(8800,()=>{
    console.log("Connected!!")
})