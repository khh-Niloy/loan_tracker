import { generateToken } from "../../utility/userToken";
import { Payable } from "../payable/payable.model";
import { IUser } from "./user.interface"
import { User } from "./user.model";

const createUserService = async(payload: Partial<IUser>)=>{
    if(!payload.name){
        throw new Error("can not register user without name");
    }
    if(!payload.phoneNumber){
        throw new Error("can not register user without phone number");
    }
    const isPhoneNumberAlreadyExist = await User.findOne({phoneNumber: payload.phoneNumber})

    if(isPhoneNumberAlreadyExist){
        await User.findOneAndUpdate({phoneNumber: payload.phoneNumber}, {name: payload.name})
        await Payable.updateMany({"loanGiver_Info.phoneNumber": payload.phoneNumber}, {$set: {"loanGiver_Info.name": payload.name}}, {new: true})
        return null
    }

    const token = generateToken(payload)

    const newUser = await User.create(payload)
    return {newUser, token}
}

export const userServices = {
    createUserService,
}