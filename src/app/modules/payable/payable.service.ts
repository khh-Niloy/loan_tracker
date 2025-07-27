import { User } from "../user/user.model";
import { IPayable } from "./payable.interface";
import { Payable } from "./payable.model";

const loanPayableServices = async(payload: {name: string, loanTaker_phoneNumber: string, loanGiver_phoneNumber : string} & Partial<IPayable>)=>{
    if(!payload.amount){
        throw new Error("please add an amount");
    }

    if(!payload.loanTaker_phoneNumber){
        throw new Error("please add loan taker phone number");
    }

    const isLoanGiverExist = await User.findOne({phoneNumber: payload.loanGiver_phoneNumber})

    if(!isLoanGiverExist){
        await User.create({
            phoneNumber: payload.loanGiver_phoneNumber,
            name: payload.name
        })
    }

    const createTransactionId = `tran-${Math.round(Math.random()*1000)}-${Date.now()}`
    const {amount, reason} = payload

    const loanTaker_Info = await User.findOne({phoneNumber: payload.loanTaker_phoneNumber}).select("name phoneNumber")
    const loanGiver_Info = await User.findOne({phoneNumber: payload.loanGiver_phoneNumber}).select("name phoneNumber")

    const loanObjCreate = {
        transactionId: createTransactionId,
        amount,
        reason,
        loanTaker_Info,
        loanGiver_Info
    }

    const newLenden = await Payable.create(loanObjCreate)
    return newLenden
}

const loanListServices = async(phoneNumber : string)=>{
    const list = await Payable.find({loanTaker_phoneNumber: phoneNumber})
     const totalLoan = list.reduce((prev, curr)=> prev + curr.amount, 0)
    return {list, totalLoan}
}

const receivableListServices = async(phoneNumber : string)=>{
    const list = await Payable.find({loanGiver_phoneNumber: phoneNumber})
    const totalLoan = list.reduce((prev, curr)=> prev + curr.amount, 0)
    return {list, totalLoan}
}

const updateLoanServices = async(payload: {amount: string, note: string}, transactionId: string, isFullPay: boolean)=>{
    const record = await Payable.findOne({transactionId: transactionId})
    const amount = parseInt(payload.amount)

    let updateLoan

    if(!record){
        throw new Error("transactionId did not match and transaction not found");
    }

    if(isFullPay){
        updateLoan = await Payable.findOneAndUpdate({transactionId: transactionId}, 
        {
            amount: 0
        }, {new: true})

        return updateLoan
    }

    if(amount > record.amount){
        throw new Error(`deu loan is ${record.amount}. enter amount less than ${record.amount}`);
    }

    updateLoan = await Payable.findOneAndUpdate({transactionId: transactionId}, 
        {
            $inc: {amount: -amount},
            $set: {notes: [...record.notes, payload.note]}
        }, {new: true})

    return updateLoan
}

export const payableServices = {
    loanPayableServices,
    loanListServices,
    receivableListServices,
    updateLoanServices
}