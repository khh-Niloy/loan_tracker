import { app } from "./app"
import mongoose from "mongoose";

const startServer = async()=>{
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ mongoose connected");
    app.listen(8000, ()=>{
        console.log("server is running at 8000 port")
    })
}

(async () => {
    await startServer();
})();