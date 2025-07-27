import { IUser } from "./user.interface"
import { User } from "./user.model";

const createUserService = async(payload: Partial<IUser>)=>{
    if(!payload.name){
        throw new Error("can not register user without name");
    }
    if(!payload.phoneNumber){
        throw new Error("can not register user without phone number");
    }
    console.log(payload.name)
    const isPhoneNumberAlreadyExist = await User.findOne({phoneNumber: payload.phoneNumber})

    if(isPhoneNumberAlreadyExist){
        await User.findOneAndUpdate({phoneNumber: payload.phoneNumber}, {name: payload.name})
        return
    }

    const newUser = await User.create(payload)
    return newUser
}

export const userServices = {
    createUserService,
}