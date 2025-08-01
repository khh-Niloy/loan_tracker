import { User } from "../user/user.model";
import { INote, IPayable } from "./payable.interface";
import { Payable } from "./payable.model";

const loanPayableServices = async(payload: {loanGiverName: string, loanTakerPhoneNumber: string, loanGiverPhoneNumber : string} & Partial<IPayable>)=>{
    if(!payload.amount){
        throw new Error("please add an amount");
    }

    // console.log(payload)

    if(!payload.loanTakerPhoneNumber){
        throw new Error("please add loan taker phone number");
    }

    const isLoanGiverExist = await User.findOne({phoneNumber: payload.loanGiverPhoneNumber})

    if(!isLoanGiverExist){
        await User.create({
            phoneNumber: payload.loanGiverPhoneNumber,
            name: payload.loanGiverName
        })
    }

    const createTransactionId = `tran-${Math.round(Math.random()*1000)}-${Date.now()}`
    const {amount, reason} = payload

    const loanTaker_Info = await User.findOne({phoneNumber: payload.loanTakerPhoneNumber}).select("name phoneNumber")
    const loanGiver_Info = await User.findOne({phoneNumber: payload.loanGiverPhoneNumber}).select("name phoneNumber")

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
    const list = await Payable.find({"loanTaker_Info.phoneNumber": phoneNumber})
     const total = list.reduce((prev, curr)=> prev + curr.amount, 0)
    return {list, total}
}

const receivableListServices = async(phoneNumber : string)=>{
    const list = await Payable.find({"loanGiver_Info.phoneNumber": phoneNumber})
    const total = list.reduce((prev, curr)=> prev + curr.amount, 0)
    return {list, total}
}

const updateLoanServices = async(payload: {amount: number, note: string}, transactionId: string, isFullPay: boolean)=>{
    const record = await Payable.findOne({transactionId: transactionId})
    const amount = payload.amount

    // console.log(payload)
    // console.log(isFullPay)

    let updateLoan

    if(!record){
        throw new Error("transactionId did not match and transaction not found");
    }

    const noteEntry: INote = {
    noteMessage: isFullPay ? "Full paid" : payload.note || "",
    amount,
    time: new Date(),
  };

    if(amount > record.amount){
        throw new Error(`deu loan is ${record.amount}. enter amount less than ${record.amount}`);
    }

    let updateDoc : any = {$inc: {amount: -amount}}

    
    updateDoc.$push = {
        notes: noteEntry
    }
    
    updateLoan = await Payable.findOneAndUpdate({transactionId: transactionId}, updateDoc, {new: true})

    return updateLoan
}

export const payableServices = {
    loanPayableServices,
    loanListServices,
    receivableListServices,
    updateLoanServices
}