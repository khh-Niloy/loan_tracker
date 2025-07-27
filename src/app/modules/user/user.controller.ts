import { Request, Response } from "express"
import { userServices } from "./user.service"


const createUser = async(req: Request, res: Response)=>{
    try {
        const user = await userServices.createUserService(req.body)
        res.status(201).json({
            message: "user created",
            data: user
        })
    } catch (error) {
        res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
    }
}

export const userController = {
    createUser,
}