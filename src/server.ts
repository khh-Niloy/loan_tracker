import { app } from "./app"
import mongoose from "mongoose";

const startServer = async()=>{
    await mongoose.connect("mongodb+srv://khhniloy0:xWHroCdA4S4fsrqg@cluster0.m65dh.mongodb.net/loan-tracker?appName=Cluster0");
    console.log("✅ mongoose connected");
    app.listen(8000, ()=>{
        console.log("server is running at 8000")
    })
}

startServer()