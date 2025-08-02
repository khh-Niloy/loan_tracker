import express from "express"
import cookieParser from "cookie-parser"
import { routes } from "./app/routes/route"
import cors from "cors"

export const app = express()
app.use(cors({
    origin: ["*"], credentials: true
}))

app.use(cookieParser());
app.use(express.json())
app.use("/api/v1", routes)

app.get("/", (req, res)=>{
    res.send("welcome to loan tracker")
})