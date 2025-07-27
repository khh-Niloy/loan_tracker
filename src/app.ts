import express from "express"
import { routes } from "./app/routes/route"

export const app = express()

app.use(express.json())
app.use("/api/v1", routes)

app.get("/", (req, res)=>{
    res.send("welcome to loan tracker")
})