// src/server.ts

import mongoose from "mongoose"
import { envVars } from "./app/config/envVars"
import app from "./app"

let isConnected = false

const connectToDB = async () => {
  if (!isConnected) {
    await mongoose.connect(envVars.MONGO_URI)
    console.log("✅ mongoose connected")
    isConnected = true
  }
}

connectToDB() // Called once per cold start

export default app // ✅ Vercel looks for this
